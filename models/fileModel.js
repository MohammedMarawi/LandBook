const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  url: String,
  type: String,   // image / video
});

module.exports = mongoose.model('File', fileSchema);