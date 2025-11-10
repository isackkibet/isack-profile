<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../vendor/autoload.php';
require_once '../config/database.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$secret_key = "your_secret_key_change_this";
$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Route handling
if (strpos($request_uri, '/api/auth/login') !== false) {
    require_once '../routes/auth.php';
} elseif (strpos($request_uri, '/api/projects') !== false) {
    require_once '../routes/projects.php';
} elseif (strpos($request_uri, '/api/contact') !== false) {
    require_once '../routes/contact.php';
} elseif (strpos($request_uri, '/api/health') !== false) {
    http_response_code(200);
    echo json_encode(["status" => "OK", "message" => "Server is running"]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Endpoint not found"]);
}
?>
