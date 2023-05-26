const connection = require("../database/connect")

const get_course= async (req, res)=> {
    try {
        const {course_id }= req.query
        const [rows]= await connection.execute("SELECT course.*, user.*, COUNT(course_view.course_id) AS view_of_course FROM course INNER JOIN user ON user.id = course.course_user_id_created LEFT JOIN course_view ON course_view.course_id = course.course_id GROUP BY course.course_id")
        return res.status(200).json({data: rows, ok: true})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= get_course