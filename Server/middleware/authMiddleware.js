const jwt = require('jsonwebtoken');
const secretAccess = process.env.JWT_ACCESS_SECRET;

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.error(error);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    const decodeData = jwt.verify(token, secretAccess);
    console.log(decodeData);
    req.user = decodeData;
    next();
  } catch (error) {
    if (!token) {
      console.error(error);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
  }
};
