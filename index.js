const express= require("express")
const cors= require("cors")
const http= require("http");
const router = require("./route/route");

require('dotenv').config();
const fs = require('fs');

const folderPath = './uploads';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Lỗi khi đọc thư mục:', err);
    return;
  }

  console.log('Danh sách các ảnh trong thư mục:');
  files.forEach((file) => {
    console.log(file);
  });
});

const app = express();
const httpServer= http.createServer(app)
app.use(express.json())
app.use(express.static('uploads'));
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
// router()
app.use(router)


httpServer.listen(process.env.PORT, ()=> console.log("Server run on port "+ process.env.PORT))
