# PHP + MySQL Backend for Portfolio

## Setup Instructions

### 1. Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Composer
- Apache/Nginx server

### 2. Installation

```bash
# Install dependencies
composer install

# Create database
mysql -u root -p < database/schema.sql

# Configure database
# Edit config/database.php with your MySQL credentials
```

### 3. Configuration

Update `config/database.php`:
```php
private $host = "localhost";
private $db_name = "portfolio_db";
private $username = "your_mysql_username";
private $password = "your_mysql_password";
```

### 4. Running Locally

If using PHP built-in server:
```bash
cd public
php -S localhost:8000
```

### 5. Default Admin Login
- Username: `admin`
- Password: `Admin123!`

### 6. API Endpoints

- **POST** `/api/auth/login` - Admin login
- **GET** `/api/projects` - Get all projects
- **POST** `/api/projects` - Create project
- **PUT** `/api/projects` - Update project
- **DELETE** `/api/projects?id=1` - Delete project
- **GET** `/api/contact` - Get all contacts
- **POST** `/api/contact` - Submit contact form
- **DELETE** `/api/contact?id=1` - Delete contact
- **GET** `/api/health` - Health check

### 7. Frontend Integration

Update your frontend `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

## Tech Stack
- PHP 7.4+
- MySQL
- PDO for database
- JWT for authentication
- password_hash/verify for security
