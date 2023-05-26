const connection = require("../database/connect");

const update_profile_user = async (req, res) => {
    try {
        const {id, role}= req.user
        const {full_name, email, avatar, cover_picture, certificate}= req.body
        const [rows]= await connection.execute("UPDATE user SET full_name= ?, email= ?, avatar= ?, cover_picture= ?, certificate= ? WHERE user.id= ?", [full_name, email, avatar, cover_picture, certificate || "", id])
        return res.status(200).json({ok: true, update: true})
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}

module.exports= update_profile_user