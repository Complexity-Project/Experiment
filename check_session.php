<?php
require_once('session_manager.php');
require_once('session_log.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$manager = new SessionManager();

// This will automatically clean timed out sessions and get next available
$assigned_session = $manager->getAvailableSession();

if ($assigned_session !== null) {
    // Log session start
    logSession("STARTED", $assigned_session);
    echo json_encode(['success' => true, 'session' => $assigned_session]);
} else {
    echo json_encode(['success' => false, 'message' => 'No available sessions']);
}
?>