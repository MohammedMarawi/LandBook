require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

const jsonFilePath = path.join(__dirname, '../data/lands.json');

const lands = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

async function uploadLandMedia() {
  for (let land of lands) {
    if (!land.landMedia || !Array.isArray(land.landMedia)) continue;

    const newMediaLinks = [];

    for (let mediaPath of land.landMedia) {
      try {
        if (!mediaPath.startsWith('http')) {
          const fullPath = path.join(__dirname, '../', mediaPath);
          const result = await cloudinary.uploader.upload(fullPath, {
            folder: 'lands',
            resource_type: 'auto',
          });
          newMediaLinks.push(result.secure_url);
        } else {
          newMediaLinks.push(mediaPath);
        }
      } catch (err) {
        console.error(`Error uploading ${mediaPath}:`, err.message);
      }
    }

    land.landMedia = newMediaLinks;
  }

  fs.writeFileSync(jsonFilePath, JSON.stringify(lands, null, 2), 'utf-8');
  console.log('All media uploaded and JSON updated successfully!');
}

uploadLandMedia();
