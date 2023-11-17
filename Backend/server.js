const express = require('express');
const connectDB = require('./dBConfig/dbConfig');
const dotenv = require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('Before connectDB');

app.use(cors({
  origin: '*',
}));
app.use((req, res, next) => {
  req.upload = upload;
  next();
});
console.log('Before app.listen');

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use('/uploads', express.static('./uploads'));

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
