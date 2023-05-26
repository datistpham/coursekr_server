const connection = require("../database/connect")

const related_video= async (req, res)=> {
    try {
        // const {course_id }= req.query
        const [rows]= await connection.execute("SELECT * FROM course INNER JOIN user ON user.id = course.course_user_id_created")
        return res.status(200).json({data: {...rows[0]}, ok: true})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= related_video