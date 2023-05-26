const connection = require("../database/connect");

const updateUser = (req, res) => {
    const { username, email, full_name } = req.body;
    const { id } = req.params;
    
    // validate request body
    if (!username || !email || !full_name) {
      return res.status(400).json({ message: "Name and email are required." });
    }
    
    // create SQL query
    const sql = `UPDATE users SET name=?, email=?, full_name= ? WHERE id=?`;
    
    // execute query
    connection.query(sql, [username, email, full_name, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
      }
      return res.status(200).json({ message: "User updated successfully." });
    });
  }

  module.exports= updateUser