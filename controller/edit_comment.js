const connection = require("../database/connect")

const edit_comment= async (req, res)=> {
    try {
        const {id, role}= req.user
        const {course_id , comment, course_interaction_comment_id }= req.body
        const [rows]= await connection.execute("UPDATE course_interaction_comment SET comment= ? WHERE course_id= ? AND user_id_post= ? AND course_interaction_comment_id= ?", [comment, course_id, id, course_interaction_comment_id])
        return res.status(200).json({ok: true, edit: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error, ok: false})
    }
}

module.exports= edit_comment