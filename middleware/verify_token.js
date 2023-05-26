const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Lấy mã JWT từ tiêu đề 'Authorization'
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Kiểm tra xem mã JWT có tồn tại không
  if (!token) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  // Giải mã và xác thực mã JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    req.user = decoded;
    next();
  });
}

module.exports= verifyToken