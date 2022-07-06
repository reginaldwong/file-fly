// pull environment variables from .env file
require('dotenv').config();

const multer = require('multer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/File');

const express = require('express');
const app = express();

// initialize multer library where all file uploads go into 'uploads' folder
const upload = multer({ dest: 'uploads' });

mongoose.connect(process.env.DB_URL);

// SPECIFY DEFAULT VIEW ENGINE
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password !== '') {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }
  const file = await File.create(fileData);
  res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.get('/file/:id', async (req, res) => {
  const file = await File.findById(req.params.id);
  file.downloadCount++;
  await file.save();
  console.log(file.downloadCount);
  res.download(file.path, file.originalName);
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Serving on port ${port}`);
});
