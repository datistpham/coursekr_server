const connection = require("../database/connect")

const profile= async (req, res)=> {
    try {
        const {id }= req.user
        const [rows]= await connection.execute("SELECT username, full_name, email, avatar, role_id, cover_picture FROM user INNER JOIN user_role ON user_role.user_id = user.id WHERE user.id= ?", [id])
        return res.status(200).json({...rows[0], auth: true})
    } catch (error) {
        return res.status(500).json({error, auth: false})
    }
}

module.exports= profile