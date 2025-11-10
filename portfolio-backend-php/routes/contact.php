<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET all contacts
if ($method === 'GET') {
    $query = "SELECT * FROM contacts ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $contacts = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $contact = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "email" => $row['email'],
            "message" => $row['message'],
            "isRead" => (bool)$row['is_read'],
            "createdAt" => $row['created_at']
        );
        array_push($contacts, $contact);
    }
    
    http_response_code(200);
    echo json_encode($contacts);
}

// POST create contact
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->name) && !empty($data->email) && !empty($data->message)) {
        $query = "INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':message', $data->message);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "Contact message received"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to save message"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "All fields are required"));
    }
}

// DELETE contact
elseif ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;
    
    if ($id) {
        $query = "DELETE FROM contacts WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Contact deleted"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to delete contact"));
        }
    }
}
?>
