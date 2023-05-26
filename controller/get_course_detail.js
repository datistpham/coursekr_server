const connection = require("../database/connect")

const get_course_detail= async (req, res)=> {
    try {
        const {course_id }= req.query
        const [rows]= await connection.execute("SELECT * FROM course INNER JOIN user ON user.id = course.course_user_id_created WHERE course.course_id= ?", [course_id])
        return res.status(200).json({data: {...rows[0]}, ok: true})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= get_course_detail