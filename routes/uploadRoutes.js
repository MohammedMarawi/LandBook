const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/image', uploadController.uploadImage);
router.post('/video', uploadController.uploadVideo);
router.delete('/delete', uploadController.deleteFile);
router.get('/list', uploadController.listFiles); 

module.exports = router;
