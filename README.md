# Isack Kibet - Full-Stack Developer Portfolio

A modern, animated portfolio website with dual functionality: public showcase and admin management system.

## 🚀 Tech Stack

### Frontend
- React 18 + Vite
- Framer Motion (animations)
- React Router (navigation)
- Axios (API calls)

### Backend
- Node.js + Express
- MongoDB (database)
- JWT (authentication)
- Multer (file uploads)
- bcrypt (password hashing)

## 📁 Project Structure

```
portfolio/
├── portfolio-frontend/    # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   ├── services/     # API services
│   │   └── styles/       # Global styles
│   └── ...
└── portfolio-backend/     # Node.js backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Auth & upload middleware
    └── server.js         # Entry point
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### 1. MongoDB Setup
Make sure MongoDB is running on `mongodb://localhost:27017/portfolio`
Or update the connection string in `portfolio-backend/.env`

### 2. Backend Setup
```bash
cd portfolio-backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd portfolio-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Create Admin Account

**Option 1: Using API (Postman/Thunder Client)**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@example.com",
  "password": "your-secure-password",
  "name": "Isack Kibet"
}
```

**Option 2: Using MongoDB directly**
You can create an admin account through MongoDB Compass or shell.

### 5. Access the Application

- **Public Portfolio**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
- **Admin Dashboard**: http://localhost:5173/admin/dashboard (after login)

## 🎨 Features

### Public Side
- ✨ Animated hero section
- 📖 About section with highlights
- 🛠️ Skills display with categories
- 🎯 Featured projects gallery
- 📧 Contact form
- 🔄 Smooth page transitions
- 📱 Fully responsive design

### Admin Side
- 🔐 Secure JWT authentication
- 📊 Dashboard with project management
- ➕ Add/Edit/Delete projects
- 🖼️ Image upload for projects
- 📬 View contact messages
- 🏷️ Project categorization
- ⭐ Featured project selection

## 🎯 Design Philosophy

- **Clean Black Theme**: Deep blacks with vibrant accent colors
- **Smooth Animations**: Framer Motion for purposeful interactions
- **Minimalist Layout**: Content-focused, spacious design
- **Accessibility**: Proper contrast, keyboard navigation

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Backend Deployment (e.g., Render, Railway)
1. Set environment variables
2. Deploy from GitHub repository
3. Update frontend VITE_API_URL to production API URL

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable VITE_API_URL

## 📦 API Endpoints

### Public
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/contact` - Submit contact form

### Protected (Requires JWT Token)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/contact` - Get all messages

### Authentication
- `POST /api/auth/register` - Register admin (disable after first use)
- `POST /api/auth/login` - Admin login

## 🎨 Customization

### Colors
Edit CSS variables in `portfolio-frontend/src/index.css`:
```css
--color-accent: #00ff88;  /* Change accent color */
--color-bg-primary: #0a0a0a;
/* ... more variables */
```

### Content
Update personal information in:
- `Hero.jsx` - Name, title, description
- `About.jsx` - Journey, highlights
- `Contact.jsx` - Email, phone, location

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

## 👨‍💻 Author

**Isack Kibet**
Self-Taught Full-Stack Developer

---

Built with ❤️ using React, Node.js, and MongoDB
