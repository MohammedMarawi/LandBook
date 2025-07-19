require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Land = require('../models/landsModel');
const connectDB = require('../config/database'); 

const lands = JSON.parse(fs.readFileSync(`${__dirname}/lands.json`, 'utf-8'));

const createData = async () => {
  try {
    await connectDB();
    await Land.create(lands);
    console.log('✅ Data successfully loaded!');
  } catch (err) {
    console.error('❌ Create error:', err.message);
  } finally {
    process.exit();
  }
};

const deleteAllData = async () => {
  try {
    await connectDB();  // ✅ الاتصال مطلوب هنا أيضًا
    await Land.deleteMany();
    console.log('🗑️ Data successfully deleted!');
  } catch (err) {
    console.error('❌ Delete error:', err.message);
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
  console.log('❓ Please use "--create" or "--delete"');
  process.exit();
}
