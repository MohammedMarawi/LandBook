require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Land = require('../models/landsModel');
const User = require('../models/usersModel');
const Review = require('../models/reviewsModel');
const connectDB = require('../config/database'); 


// const lands = JSON.parse(fs.readFileSync(`${__dirname}/lands.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

const createData = async () => {
  try {
    await connectDB();
    // await Land.create(lands);
    await User.create(users, {validateBeforeSave: false});
    // await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(' Create error:', err.message);
  } finally {
    process.exit();
  }
};

const deleteAllData = async () => {
  try {
    await connectDB();  
    // await Land.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log(' Data successfully deleted!');
  } catch (err) {
    console.error(' Delete error:', err.message);
  } finally {
    process.exit();
  }
};

const command = process.argv[2];

if (command === '--create') {
  createData();
} else if (command === '--delete') {
  deleteAllData();
} else {
  console.log('Please use "--create" or "--delete"');
  process.exit();
}