const multer = require('multer')

// const storage = multer.memoryStorage()

const path = require('path');

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '/../../public/files');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}_${Date.now()}`);
  },
});

exports.upload = multer({ storage })
