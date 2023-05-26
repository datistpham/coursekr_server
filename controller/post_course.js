const connection = require("../database/connect")
const generateThumbnail = require("../util/generate_video_thumb")

const post_course= async (req, res)=> {
    try {

        const {id, role}= req.user
        const {course_title, course_video_url, course_description, course_category}= req.body
        const thumbUrl= "/thumbnail/"+ await generateThumbnail("./uploads/"+ course_video_url) + ".png"
        const [rows]= await connection.execute("INSERT INTO course(course_title, course_video_url, course_user_id_created, course_thumb_url, course_description, time_created, course_category) VALUES(?, ?, ?, ?, ?, ?, ?)", [course_title, "/"+course_video_url, id, thumbUrl, course_description, new Date(), course_category])
        return res.status(200).json({add: true, ok: true, message: "Course created !"})
    } catch (error) {
        return res.status(500).json({error, add: false, ok: false, message: "Error"})
    }
}

module.exports= post_course