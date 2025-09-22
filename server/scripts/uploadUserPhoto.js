require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

const jsonFilePath = path.join(__dirname, '../data/lands.json');

const lands = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

async function uploadUserPhotos() {
  for (let land of lands) {
    if (!land.userPhoto) continue; 

    try {
      if (!land.userPhoto.startsWith('http')) {
        const fullPath = path.join(__dirname, '../', land.userPhoto);

        const result = await cloudinary.uploader.upload(fullPath, {
          folder: 'users',       
          resource_type: 'image' 
        });

        land.userPhoto = result.secure_url;
      }
    } catch (err) {
      console.error(`Error uploading ${land.userPhoto}:`, err.message);
    }
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify(lands, null, 2), 'utf-8');
  console.log('All user photos uploaded and JSON updated successfully!');
}

uploadUserPhotos();
