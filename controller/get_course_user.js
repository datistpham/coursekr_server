const connection = require("../database/connect")

const get_course_user= async (req, res)=> {
    try {
        const {user_id }= req.query
        const [rows1]= await connection.execute("SELECT full_name, avatar, cover_picture, email, certificate, role_id FROM user INNER JOIN user_role ON user.id = user_role.user_id WHERE user.id= ?", [user_id])
        const [rows]= await connection.execute("SELECT * FROM course INNER JOIN user ON user.id = course.course_user_id_created WHERE course.course_user_id_created= ?", [user_id])
        return res.status(200).json({data: rows, ok: true, profile: rows1[0]})
    } catch (error) {
        return res.status(500).json({error, ok: false})
    }
}

module.exports= get_course_user