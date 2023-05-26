const connection = require("../database/connect");
// const bcrypt = require('bcrypt');

async function signup(req, res) {
  
  try {
    const { user_name, email, password, full_name, role } = req.body;
    // Check if the email already exists in the database
    const [rows ] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows[0]) {
      return res.status(201).json({ message: 'Email already exists', ok: false });
    }
    
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into the database
    await connection.execute('INSERT INTO user(username, password, email, full_name) VALUES(?, ?, ?, ?)', [ user_name, password, email, full_name ]);
    const [row1]= await connection.execute("SELECT id FROM user WHERE username=? AND password= ? AND email= ?", [user_name, password, email])
    await connection.execute("INSERT INTO user_role(user_id, role_id) VALUES(?, ?)", [row1[0]?.id, role])
    
    res.status(201).json({ message: 'User created successfully', ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', ok: false });
  }
}

module.exports= signup