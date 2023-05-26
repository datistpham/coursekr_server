const connection = require("../database/connect")

const get_view_course= async (req, res)=> {
    try {
        const {course_id }= req.query
        const [rows]= await connection.execute("SELECT * FROM course_view WHERE course_view.course_id = ?", [course_id])
        return res.status(200).json({data: rows, ok: true})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= get_view_course