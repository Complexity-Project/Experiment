<?php
require_once('session_log.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$session_id = $_POST['session_id'];
$occupied_sessions_file = "data/occupied_sessions.txt";

// Read current occupied sessions
$occupied_sessions = array_map('trim', file($occupied_sessions_file));

// Remove session from occupied list by matching just the session ID part
$occupied_sessions = array_filter($occupied_sessions, function($line) use ($session_id) {
    $parts = explode('|', $line);
    return $parts[0] !== $session_id;
});

file_put_contents($occupied_sessions_file, implode("\n", $occupied_sessions) . "\n", LOCK_EX);

// Log session release
logSession("RELEASED", $session_id);

echo json_encode(['success' => true]);
?>