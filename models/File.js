const mongoose = require('mongoose');

// Create File schema
const File = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  password: String,
  downloadCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Create table in database called "File" using the File schema
mongoose.exports = mongoose.model('File', File);
