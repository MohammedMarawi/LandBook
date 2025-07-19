const User = require('../models/usersModel');
const connectDB = require('../config/database'); 
const mongoose = require('mongoose');

(async () => {
  try {
    await connectDB();

    const admin = await User.create({
      name: 'mohammedMarawi',
      email: 'adminIsMohammed@example.com',
      password: 'abc123abc',
      role: 'admin'
    });

    console.log('Admin created:', admin);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
})();
