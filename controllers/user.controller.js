const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

// Create and send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Register new user
const register = catchAsync(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('البريد الإلكتروني مسجل بالفعل.', 400));
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    phone,
    password
  });

  createSendToken(user, 201, res);
});

// Login user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('يرجى إدخال البريد الإلكتروني وكلمة المرور.', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 401));
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  createSendToken(user, 200, res);
});

// Get current user profile
const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update user profile
const updateMe = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  // Create filtered object to only allow certain fields to be updated
  const filteredBody = {};
  if (name) filteredBody.name = name;
  if (email) filteredBody.email = email;
  if (phone) filteredBody.phone = phone;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// Change password
const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('كلمة المرور الحالية غير صحيحة.', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  createSendToken(user, 200, res);
});

// Get all users (admin only)
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

// Get user by ID (admin only)
const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }

  const user = await User.findById(id).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Update user (admin only)
const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }
  
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  }).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// Delete user (admin only)
const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID', 400));
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully.',
    data: {
      user
    }
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}; 