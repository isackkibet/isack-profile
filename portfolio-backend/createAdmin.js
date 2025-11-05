import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      process.exit(0);
    }

    // Create admin
    const admin = new Admin({
      username: 'admin',
      email: 'isackkibet@example.com',
      password: 'Admin123!',
      name: 'Isack Kibet'
    });

    await admin.save();
    console.log('✅ Admin account created successfully!');
    console.log('Username: admin');
    console.log('Password: Admin123!');
    console.log('⚠️  Please change the password after first login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
