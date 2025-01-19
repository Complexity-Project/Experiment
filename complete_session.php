<?php
require_once('session_manager.php');
require_once('session_log.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$session_id = $_POST['session_id'];
$manager = new SessionManager();

if ($manager->completeSession($session_id)) {
    // Log session completion
    logSession("COMPLETED", $session_id);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to complete session']);
}
?>