const multer = require('multer');
const path=require('path')
const fs=require('fs')
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Specify the folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
    },
});

const upload = multer({ storage });
module.exports=upload


