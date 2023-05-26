const connection = require("../database/connect")

const delete_comment= async (req, res)=> {
    try {
        const {id, role}= req.user
        const {comment_id }= req.body
        const [rows]= await connection.execute("DELETE FROM course_interaction_comment WHERE course_interaction_comment_id= ?", [comment_id])
        return res.status(200).json({ok: true, delete: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error, ok: false})
    }
}

module.exports= delete_comment