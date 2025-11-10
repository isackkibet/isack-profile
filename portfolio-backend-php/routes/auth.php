<?php
require_once '../config/database.php';
use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $query = "SELECT id, username, email, password, name FROM admins WHERE username = :username LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $data->username);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            $secret_key = "your_secret_key_change_this";
            $issued_at = time();
            $expiration_time = $issued_at + (60 * 60 * 24); // 24 hours
            
            $payload = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "data" => array(
                    "id" => $row['id'],
                    "username" => $row['username'],
                    "email" => $row['email'],
                    "name" => $row['name']
                )
            );

            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login successful",
                "token" => $jwt,
                "admin" => array(
                    "id" => $row['id'],
                    "username" => $row['username'],
                    "email" => $row['email'],
                    "name" => $row['name']
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid credentials"));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Username and password required"));
}
?>
