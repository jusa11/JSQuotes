const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Role = require('../models/Role.js');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateAccesToken = (id, username, roles) => {
  const payload = {
    _id: id,
    username,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
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
        return res
          .status(400)
          .json({ message: 'Пользователь с таким логином уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      let userRole = await Role.findOne({ value: 'user' });

      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'Пользователь был успешно зарегистрирован' });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен не верный пароль' });
      }
      const token = generateAccesToken(user._id, user.username, user.roles);

      return res.json({ token });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      res.status(400).json({ message: 'Login error' });
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
}

module.exports = new AuthController();
