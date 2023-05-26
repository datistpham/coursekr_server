const connection = require("../database/connect")
const Fuse = require('fuse.js')

const search= async (req, res)=> {
    try {
        const {search_query }= req.query
        const [rows]= await connection.execute("SELECT * FROM course INNER JOIN user ON user.id = course.course_user_id_created")
        const options = {
            keys: [
              "course_title",
            ]
          };
          const fuse = new Fuse(rows, options);
          return res.status(200).json(fuse.search(search_query))
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports= search