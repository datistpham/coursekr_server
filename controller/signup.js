const connection = require("../database/connect");
const bcrypt = require('bcrypt');

async function signup() {
    const { username, email, password, full_name } = req.body;
  
  try {
    // Check if the email already exists in the database
    const existingUser = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser[0]) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into the database
    await connection.execute('INSERT INTO users(username, password, email, full_name) VALUES(?, ?, ?, ?)', [ username, password, email, full_name ]);
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports= signup