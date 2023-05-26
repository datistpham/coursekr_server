const connection = require("../database/connect");
const jwt= require("jsonwebtoken")

async function login(req, res) {
  const { email, password } = req.body;

  // Kiểm tra xem email và mật khẩu có được cung cấp hay không
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp email và mật khẩu.", ok: false });
  }

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng.", ok: false });
    }

    const user = rows[0];

    // Kiểm tra mật khẩu
    const passwordMatch = password === user?.password
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng.", ok: false });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token, ok: true, uid: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra.", ok: false });
  }
}

module.exports = login;
