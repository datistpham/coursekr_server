const connection = require("../database/connect")

const like_course= async (req, res)=> {
    try {
        const {id, role}= req.user
        const {course_id }= req.body

        const [rows]= await connection.execute("SELECT is_like FROM course_interaction_like WHERE course_id= ? AND user_id_post= ?", [course_id, id])
        if(rows.length >0 ) {
            await connection.execute("DELETE FROM course_interaction_like WHERE course_id= ? AND user_id_post= ?", [course_id, id])
            return res.status(200).json({like: false, ok: true})
        }
        else {
            await connection.execute("INSERT INTO course_interaction_like(is_like, user_id_post, course_user_id_created, course_id, time_created) VALUES(?, ?, ?, ?, ?)", [1, id, 0, course_id, new Date()])
            return res.status(200).json({like: true, ok: false})
        }
    } catch (error) {
        return res.status(200).json({error, ok: false})        
    }
}

module.exports= like_course