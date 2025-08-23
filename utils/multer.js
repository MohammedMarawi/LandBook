const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'lands',             // مجلد في Cloudinary
      resource_type: 'auto',       // auto = صور + فيديو
      public_id: Date.now() + '-' + file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
