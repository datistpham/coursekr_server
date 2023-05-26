const express= require("express");
const signup = require("../controller/signup");
const login = require("../controller/login");
const logout = require("../controller/logout");
const updateUser = require("../controller/update_user");
const upload = require("../util/upload_video");
const post_course = require("../controller/post_course");
const search = require("../controller/search");
const like_course = require("../controller/like_course");
const comment_course = require("../controller/comment_course");
const view_course = require("../controller/view_course");
const verifyToken = require("../middleware/verify_token");
const profile = require("../controller/profile");
const get_course = require("../controller/get_course");
const get_course_detail = require("../controller/get_course_detail");
const get_like_course = require("../controller/get_like_course");
const get_comment_course = require("../controller/get_comment_course");
const get_view_course = require("../controller/get_view_course");
const get_course_user = require("../controller/get_course_user");
const update_profile_user = require("../controller/update_profile_user");
const edit_comment = require("../controller/edit_comment");
const related_video = require("../controller/related_video");
const delete_comment = require("../controller/delete_comment");
const router = express.Router();

router.post("/api/v1/signup", signup)
router.post("/api/v1/login", login)
router.post("/api/v1/logout", logout)
router.post("/api/v1/update", updateUser)
router.post("/api/v2/upload-course",verifyToken, post_course)
router.get("/api/v1/course/search", search)
router.post("/api/v1/course/like", verifyToken, like_course)
router.post("/api/v1/course/comment", verifyToken, comment_course)
router.post("/api/v1/course/view", view_course)
router.post("/api/v1/upload-media", upload.single("video"), async (req, res)=> {
    try {
        if(req.file) {
            return res.status(200).json({...req.file, ok: true, message: "Upload success"})
        }
        else {
            return res.status(200).json({ok: false, message: "Upload failed"})
        }
        
    } catch (error) {
        return res.status(500).json({error, ok: false, message: "Error server"})
    }
})
router.get("/api/v1/profile", verifyToken, profile)
router.get("/api/v1/course", get_course)
router.get("/api/v1/course/detail", get_course_detail)
router.get("/api/v1/course/like", get_like_course)
router.get("/api/v1/course/comment", get_comment_course)
router.get("/api/v1/course/view", get_view_course)
router.get("/api/v1/channel", get_course_user)
router.put("/api/v1/profile", verifyToken, update_profile_user)
router.put("/api/v1/comment", verifyToken, edit_comment)
router.get("/api/v1/video/related", related_video)
router.delete("/api/v1/comment", verifyToken, delete_comment)

module.exports = router;