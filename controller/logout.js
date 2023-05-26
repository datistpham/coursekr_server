async function logout(req, res) {
    // nếu không có thông tin token trong header của request
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // lấy token từ header
  const token = req.headers.authorization.split(' ')[1];

  try {
    // xác thực và giải mã token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // xóa token khỏi danh sách token của user
    delete refreshTokens[userId];

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports= logout