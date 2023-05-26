const connection = require("../database/connect")

const get_like_course= async (req, res)=> {
    try {
        const {course_id }= req.query
        const [rows]= await connection.execute("SELECT * FROM course_interaction_like INNER JOIN user ON user.id = course_interaction_like.user_id_post WHERE course_interaction_like.course_id = ?", [course_id])
        return res.status(200).json({data: rows, ok: true})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= get_like_course