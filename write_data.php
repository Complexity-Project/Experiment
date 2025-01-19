<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if (empty($_POST['postresult']) || empty($_POST['postfile'])) {
    die("Error: Missing data or filename");
}

// Get the posted data
$data = $_POST['postresult'];
$filename = $_POST['postfile'];

// Clean the filename to prevent directory traversal
$filename = basename($filename);

// Make sure we're writing to the data directory
$filepath = __DIR__ . "/data/" . $filename;

try {
    // Create directory if it doesn't exist
    if (!file_exists(__DIR__ . "/data")) {
        mkdir(__DIR__ . "/data", 0777, true);
    }
    
    // Write the data
    if (file_put_contents($filepath, $data, FILE_APPEND | LOCK_EX)) {
        echo "Success: Data written to " . $filename;
    } else {
        echo "Error: Could not write to file";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>