require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

// مسار ملف JSON
const jsonFilePath = path.join(__dirname, '../data/lands.json');

// قراءة ملف JSON
const lands = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

async function uploadUserPhotos() {
  for (let land of lands) {
    if (!land.userPhoto) continue; // إذا ما في صورة، تجاهل

    try {
      if (!land.userPhoto.startsWith('http')) {
        // مسار الصورة المحلي
        const fullPath = path.join(__dirname, '../', land.userPhoto);

        // رفع الصورة على Cloudinary
        const result = await cloudinary.uploader.upload(fullPath, {
          folder: 'users',       // تخزين الصور في مجلد "users"
          resource_type: 'image' // نوع الملف صورة
        });

        // تحديث الرابط في JSON بالرابط الجديد من Cloudinary
        land.userPhoto = result.secure_url;
      }
    } catch (err) {
      console.error(`Error uploading ${land.userPhoto}:`, err.message);
    }
  }

  // كتابة البيانات الجديدة بنفس الملف
  fs.writeFileSync(jsonFilePath, JSON.stringify(lands, null, 2), 'utf-8');
  console.log('✅ All user photos uploaded and JSON updated successfully!');
}

uploadUserPhotos();
