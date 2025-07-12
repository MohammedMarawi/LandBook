const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Protect routes - check if user is authenticated
const protect = catchAsync(async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('أنت غير مسجل الدخول. يرجى تسجيل الدخول للوصول.', 401));
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('المستخدم الذي ينتمي إليه هذا الرمز المميز لم يعد موجوداً.', 401));
  }

  // Check if user changed password after the token was issued
  if (currentUser.passwordChangedAt) {
    const changedTimestamp = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
    if (decoded.iat < changedTimestamp) {
      return next(new AppError('غير المستخدم كلمة المرور مؤخراً! يرجى تسجيل الدخول مرة أخرى.', 401));
    }
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Restrict to certain roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('ليس لديك إذن لأداء هذا الإجراء.', 403));
    }
    next();
  };
};

// Optional authentication - doesn't throw error if no token
const optionalAuth = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      if (currentUser) {
        req.user = currentUser;
      }
    } catch (error) {
      // Token is invalid, but we don't throw error
    }
  }

  next();
});

module.exports = {
  protect,
  restrictTo,
  optionalAuth
}; 