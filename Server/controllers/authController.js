const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Role = require('../models/Role.js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const secretAccess = process.env.JWT_ACCESS_SECRET;
const secretResfresh = process.env.JWT_REFRESH_SECRET;

console.log(secretAccess, secretResfresh);

const generateAccesToken = (id, username, roles, logo) => {
  const payload = {
    _id: id,
    username,
    roles,
    logo,
  };
  const accessToken = jwt.sign(payload, secretAccess, { expiresIn: '0.5m' });
  const refreshToken = jwt.sign({ _id: id }, secretResfresh, {
    expiresIn: '1m',
  });

  return {
    accessToken,
    refreshToken,
  };
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Формат файла не поддерживается	'), false);
    }
    cb(null, true);
  },
});

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `${username} не в нашей банде` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: 'Ты ввел неверный шифр, сынок' });
      }
      const { accessToken, refreshToken } = generateAccesToken(
        user._id,
        user.username,
        user.roles,
        user.logo
      );

      user.refreshToken = refreshToken;
      await user.save();

      return res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'Это погоняло уже занято' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      let userRole = await Role.findOne({ value: 'user' });

      const logoPath = req.file
        ? `/uploads/${req.file.filename}`
        : '/uploads/default-logo.png';

      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
        logo: logoPath,
      });
      await user.save();

      const { accessToken, refreshToken } = generateAccesToken(
        user._id,
        user.username,
        user.roles,
        user.logo
      );

      return res.json({ accessToken, message: 'Ты был зачислен в нашу банду' });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Ошибка при получении пользователей', error);
      res.status(500).json({ message: error.message });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(403).json({ message: 'Токен не найден' });
      }

      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.status(403).json({ message: 'Неверный токен' });
      }
      const decode = jwt.verify(refreshToken, secretResfresh);
      if (!decode) {
        return res.status(403).json({ message: 'Токен не валиден' });
      }

      const { accessToken, refreshToken: newRefreshToken } = generateAccesToken(
        user._id,
        user.username,
        user.roles,
        user.logo
      );

      user.refreshToken = newRefreshToken;
      await user.save();
      return res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('Ошибка при обновлении токена', error);
      res.status(400).json({ message: 'Refresh error' });
    }
  }
}

const authController = new AuthController();

module.exports = { authController, upload };
