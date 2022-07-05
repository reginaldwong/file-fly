// pull environment variables from .env file
require('dotenv').config();

const multer = require('multer');
const mongoose = require('mongoose');
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

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('HELLO!!!');
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Serving on port ${port}`);
});
