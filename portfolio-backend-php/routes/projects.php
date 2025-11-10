<?php
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET all projects
if ($method === 'GET') {
    $query = "SELECT * FROM projects ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $projects = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $project = array(
            "id" => $row['id'],
            "title" => $row['title'],
            "description" => $row['description'],
            "category" => $row['category'],
            "technologies" => json_decode($row['technologies']),
            "githubUrl" => $row['github_url'],
            "liveUrl" => $row['live_url'],
            "imageUrl" => $row['image_url'],
            "featured" => (bool)$row['featured'],
            "createdAt" => $row['created_at']
        );
        array_push($projects, $project);
    }
    
    http_response_code(200);
    echo json_encode($projects);
}

// POST create project (requires authentication)
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "INSERT INTO projects (title, description, category, technologies, github_url, live_url, image_url, featured) 
              VALUES (:title, :description, :category, :technologies, :github_url, :live_url, :image_url, :featured)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':technologies', json_encode($data->technologies));
    $stmt->bindParam(':github_url', $data->githubUrl);
    $stmt->bindParam(':live_url', $data->liveUrl);
    $stmt->bindParam(':image_url', $data->imageUrl);
    $stmt->bindParam(':featured', $data->featured);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Project created", "id" => $db->lastInsertId()));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to create project"));
    }
}

// PUT update project
elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE projects SET title=:title, description=:description, category=:category, 
              technologies=:technologies, github_url=:github_url, live_url=:live_url, 
              image_url=:image_url, featured=:featured WHERE id=:id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':technologies', json_encode($data->technologies));
    $stmt->bindParam(':github_url', $data->githubUrl);
    $stmt->bindParam(':live_url', $data->liveUrl);
    $stmt->bindParam(':image_url', $data->imageUrl);
    $stmt->bindParam(':featured', $data->featured);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "Project updated"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to update project"));
    }
}

// DELETE project
elseif ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;
    
    if ($id) {
        $query = "DELETE FROM projects WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Project deleted"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to delete project"));
        }
    }
}
?>
