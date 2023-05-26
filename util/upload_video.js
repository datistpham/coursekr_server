const multer = require('multer');
// Thiết lập multer để xử lý yêu cầu tải lên video
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Đường dẫn lưu trữ video
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Tên file video
    }
  });
const upload = multer({ storage });

module.exports= upload