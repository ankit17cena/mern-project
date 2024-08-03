const express = require("express");
const multer = require("multer");
const path = require("path");
const { processFile } = require("../controllers/fileController");
const router = express.Router();

//file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => { 
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
 
const upload = multer({ storage });

//file upload route
router.post("/upload", upload.single("file"), processFile);

module.exports = router;
