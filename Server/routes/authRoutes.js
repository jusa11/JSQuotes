const { check } = require('express-validator');
const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const roleMiddleware = require('../middleware/roleMiddleware');
router.post(
  '/registration/',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть от 4 до 10 символов').isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['admin']), controller.getUsers);

module.exports = router;
