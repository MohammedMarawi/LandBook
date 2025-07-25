const express = require('express');
const cors = require('cors');
const bookingsRoutes = require('../routes');
const landRoutes = require('../routes');
const  userRoutes = require('../routes');
const reviewRoutes = require('../routes');
const errorHandler = require('../middleware/errorHandler');
const AppError = require('../utils/appError');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');


const configureApp = (app) => {
  app.use(express.json());

  app.use('/api', bookingsRoutes);
  app.use('/api', landRoutes);
  app.use('/api', userRoutes);
  app.use('/api', reviewRoutes);
   
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use(
    cors({
      origin: 'http://localhost:5500', // Address of the frontend
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );
   const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    meesage: 'Too many request from this IP. please try again in an hour!',
  });
  app.use('/api', limiter);
  
  // Body parser, reading data from body into req.body
  app.use(express.json({ limit: '10kb' }));
  app.use(express.static(`${__dirname}/public`));


  app.all('/{*any}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(errorHandler);
};

module.exports = configureApp;
