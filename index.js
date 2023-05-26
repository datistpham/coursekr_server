const express= require("express")
const cors= require("cors")
const http= require("http");
const router = require("./route/route");

require('dotenv').config();

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
