const connection = require("../database/connect")

const comment_course= async (req, res)=> {
    try {
        const {role, id}= req.user
        const {course_id, comment, user_id_created}= req.body
        await connection.execute("INSERT INTO course_interaction_comment(comment, user_id_post, user_id_created, course_id, time_created) VALUES(?, ?, ?, ?, ?)", [comment, id, user_id_created, course_id, new Date()])
        return res.status(200).json({comment: true, create: true, ok: true, add: true})
    } catch (error) {
        return res.status(200).json({error, ok: false})        
    }
}

module.exports= comment_course