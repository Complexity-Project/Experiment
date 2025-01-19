<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function logSession($type, $session_id) {
    $log_file = "data/session_log.txt";
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "$timestamp - Session $session_id - $type\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}
?>