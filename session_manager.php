<?php
// session_manager.php

class SessionManager {
    private $occupied_file = "data/occupied_sessions.txt";
    private $completed_file = "data/completed_sessions.txt";
    private $session_format = "%d|%s"; // format: "id|timestamp"
    private $timeout_minutes = 60; // 1 hour timeout
    
    public function __construct() {
        // Create files if they don't exist
        foreach ([$this->occupied_file, $this->completed_file] as $file) {
            if (!file_exists($file)) {
                file_put_contents($file, "");
            }
        }
    }
    
    private function getCurrentTimestamp() {
        return date('Y-m-d H:i:s');
    }
    
    private function parseSessionLine($line) {
        $parts = explode('|', trim($line));
        return [
            'id' => intval($parts[0]),
            'timestamp' => isset($parts[1]) ? $parts[1] : null
        ];
    }
    
    private function isSessionTimedOut($timestamp) {
        if (!$timestamp) return true;
        $session_time = strtotime($timestamp);
        $current_time = time();
        return ($current_time - $session_time) > ($this->timeout_minutes * 60);
    }
    
    private function cleanTimedOutSessions() {
        $occupied_sessions = array_map('trim', file($this->occupied_file));
        $active_sessions = [];
        
        foreach ($occupied_sessions as $session) {
            $session_data = $this->parseSessionLine($session);
            if (!$this->isSessionTimedOut($session_data['timestamp'])) {
                $active_sessions[] = $session;
            }
        }
        
        file_put_contents($this->occupied_file, implode("\n", $active_sessions) . "\n");
    }
    
    public function getAvailableSession() {
        // Clean timed out sessions first
        $this->cleanTimedOutSessions();
        
        // Get current occupied and completed sessions
        $occupied_sessions = array_map([$this, 'parseSessionLine'], file($this->occupied_file));
        $completed_sessions = array_map([$this, 'parseSessionLine'], file($this->completed_file));
        
        $occupied_ids = array_column($occupied_sessions, 'id');
        $completed_ids = array_column($completed_sessions, 'id');
        
        $unavailable_ids = array_merge($occupied_ids, $completed_ids);
        
        // Find first available ID
        for ($i = 1; $i <= 400; $i++) {
            if (!in_array($i, $unavailable_ids)) {
                $new_session = sprintf($this->session_format, $i, $this->getCurrentTimestamp());
                file_put_contents($this->occupied_file, $new_session . "\n", FILE_APPEND);
                return $i;
            }
        }
        
        return null;
    }
    
    public function completeSession($session_id) {
        // Remove from occupied
        $occupied_sessions = array_map('trim', file($this->occupied_file));
        $active_sessions = [];
        
        foreach ($occupied_sessions as $session) {
            $session_data = $this->parseSessionLine($session);
            if ($session_data['id'] != $session_id) {
                $active_sessions[] = $session;
            }
        }
        
        file_put_contents($this->occupied_file, implode("\n", $active_sessions) . "\n");
        
        // Add to completed
        $completed_session = sprintf($this->session_format, $session_id, $this->getCurrentTimestamp());
        file_put_contents($this->completed_file, $completed_session . "\n", FILE_APPEND);
        
        return true;
    }
    
    public function releaseSession($session_id) {
        $occupied_sessions = array_map('trim', file($this->occupied_file));
        $active_sessions = [];
        
        foreach ($occupied_sessions as $session) {
            $session_data = $this->parseSessionLine($session);
            if ($session_data['id'] != $session_id) {
                $active_sessions[] = $session;
            }
        }
        
        file_put_contents($this->occupied_file, implode("\n", $active_sessions) . "\n");
        return true;
    }
}