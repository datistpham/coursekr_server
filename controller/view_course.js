const connection = require("../database/connect")

const view_course= async (req, res)=> {
    try {
        // const {id, role}= req.user
        const {course_id}= req.body
        await connection.execute("INSERT INTO course_view(course_id, time_created) VALUES(?, ?)", [course_id, new Date()])
        return res.status(200).json({view: true, create: true})
    } catch (error) {
        return res.status(200).json(error)        
    }
}

module.exports= view_course