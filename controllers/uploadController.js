const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const AppError = require('../utils/appError');

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد multer للتخزين في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ======================= رفع صورة =======================
exports.uploadImage = [
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.file) return next(new AppError('No image uploaded', 400));

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'landbook_uploads/images',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return next(new AppError(error.message, 500));
          res.status(200).json({
            status: 'success',
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(req.file.buffer);
    } catch (err) {
      next(err);
    }
  },
];

// ======================= رفع فيديو =======================
exports.uploadVideo = [
  upload.single('file'),
  async (req, res, next) => {
    try {
      if (!req.file) return next(new AppError('No video uploaded', 400));

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'landbook_uploads/videos',
          resource_type: 'video',
        },
        (error, result) => {
          if (error) return next(new AppError(error.message, 500));
          res.status(200).json({
            status: 'success',
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(req.file.buffer);
    } catch (err) {
      next(err);
    }
  },
];

// ======================= حذف ملف =======================
exports.deleteFile = async (req, res, next) => {
  try {
    const { public_id, resource_type } = req.body;

    if (!public_id) {
      return next(new AppError('public_id is required', 400));
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type || 'image', // image أو video
    });

    res.status(200).json({
      status: 'success',
      result,
    });
  } catch (err) {
    console.log(err);
    next(new AppError(err.message || 'Server error during deletion', 500));
  }
};

// ======================= استعراض الملفات =======================
exports.listFiles = async (req, res, next) => {
  try {
    const { folder = 'landbook_uploads' } = req.query;

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 300, // يمكن تعديل العدد
    });

    res.status(200).json({
      status: 'success',
      files: result.resources,
    });
  } catch (err) {
    next(new AppError(err.message || 'Server error during listing', 500));
  }
};
