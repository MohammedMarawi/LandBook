// app.js

// ================== Imports ==================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoutes = require('./routes/bookings');
const landsRoutes = require('./routes/lands');
const usersRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/appError');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRoutes);
app.use('/api/lands', landsRoutes);
app.use('/api/users', usersRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});