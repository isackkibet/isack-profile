# 🚀 Quick Start Guide - Isack Kibet Portfolio

## ✅ Current Status

Your portfolio application is now **fully built** and ready to use!

### What's Been Created:

1. ✅ **Backend API** (Node.js + Express + MongoDB)
   - Project management
   - Contact form handling  
   - JWT authentication
   - File upload system

2. ✅ **Frontend Application** (React + Vite)
   - Animated hero section
   - About & Skills sections
   - Projects gallery
   - Contact form
   - Admin dashboard

3. ✅ **Admin Panel**
   - Secure login
   - Project CRUD operations
   - Message management
   - Image uploads

## 📋 Next Steps

### 1. Install & Start MongoDB

**Option A: MongoDB Community Server (Local)**
- Download: https://www.mongodb.com/try/download/community
- Install and start the service
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Free)**
- Sign up: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `portfolio-backend/.env` with your connection string

### 2. Start the Application

**Option 1: Using the startup script**
```powershell
cd "c:\Users\isack\isacc profile"
.\start-portfolio.ps1
```

**Option 2: Manual start**

Terminal 1 - Backend:
```powershell
cd "c:\Users\isack\isacc profile\portfolio-backend"
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd "c:\Users\isack\isacc profile\portfolio-frontend"
npm run dev
```

### 3. Create Your Admin Account

Use Postman, Thunder Client, or curl:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123!",
  "name": "Isack Kibet"
}
```

**⚠️ Important**: After creating your admin account, consider removing or disabling the register endpoint in `portfolio-backend/routes/authRoutes.js` for security.

### 4. Access Your Portfolio

- **Public Site**: http://localhost:5174 (or the port shown in terminal)
- **Admin Login**: http://localhost:5174/admin/login
- **Admin Dashboard**: http://localhost:5174/admin/dashboard

## 🎨 Customization Guide

### Update Personal Information

1. **Hero Section** - `portfolio-frontend/src/components/sections/Hero.jsx`
   - Change name, title, description

2. **About Section** - `portfolio-frontend/src/components/sections/About.jsx`
   - Update your journey, highlights

3. **Skills** - `portfolio-frontend/src/components/sections/Skills.jsx`
   - Add/remove technologies

4. **Contact Info** - `portfolio-frontend/src/components/sections/Contact.jsx`
   - Update email, phone, location

### Change Colors

Edit `portfolio-frontend/src/index.css`:
```css
--color-accent: #00ff88;  /* Change this to your preferred color */
```

### Add Projects

1. Login to admin panel
2. Click "Add New Project"
3. Fill in details and upload image
4. Mark as "Featured" to show on homepage

## 🔧 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify `.env` file exists in portfolio-backend
- ✅ Run `npm install` in portfolio-backend folder

### Frontend won't start
- ✅ Run `npm install` in portfolio-frontend folder
- ✅ Check if port 5173/5174 is available
- ✅ Verify `.env` file exists in portfolio-frontend

### Can't login to admin
- ✅ Make sure backend is running
- ✅ Check if admin account was created successfully
- ✅ Verify MongoDB connection

### Images not showing
- ✅ Check if backend is running
- ✅ Verify uploads folder exists in portfolio-backend
- ✅ Check browser console for CORS errors

## 📦 Production Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to production backend URL

### Database (MongoDB Atlas)
1. Create free cluster
2. Whitelist IP addresses
3. Update backend connection string

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)

## 🆘 Need Help?

Common issues and solutions are in the main README.md file.

---

**Congratulations! Your portfolio is ready to showcase your skills! 🎉**
