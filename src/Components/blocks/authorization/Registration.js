import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/notificationsSlice';
import axios from 'axios';
import Logo from '../../others/Logo';

const Registration = ({ onSwitch, onClose }) => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!form.username || !form.password) {
      dispatch(setError('Не заполнены обязательные поля'));
      return;
    }
    console.log(form);
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/registration/',
        form
      );
      onClose();
      console.log('Успешная регистрация пользователя: ', res.data);
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Произошла ошибка при регистрации'
        )
      );
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <div className="authorization">
      <Logo />

      <p className="registration-form__text form-text">
        Присоединяйся к сообществу ценителей пацанских цитат Джейсона Стетхэма!
        Если у тебя есть мудрые мысли или жизненные принципы, которыми ты хочешь
        поделиться — добро пожаловать. Здесь каждый может внести свою лепту в
        искусство суровых афоризмов. 📢 <br />
        <br />
        Зарегистрируйся и добавляй цитаты, которые заставят задуматься даже
        самого бывалого мужика. 🔥 Оценивай и сохраняй лучшие изречения. 💬
        Делись мудростью с единомышленниками. Войди в круг избранных —
        регистрируйся прямо сейчас! 🚀
      </p>
      <form
        className="registration-form authorization-form"
        onSubmit={onSubmitHandler}
      >
        <input
          className="registration-form__login form-login"
          name="username"
          placeholder="Укажите логин"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          className="registration-form__name form-name"
          name="name"
          placeholder="Ваше имя"
          type="text"
          onChange={handleChange}
          value={form.name}
        />
        <input
          className="registration-form__password form-password"
          name="password"
          placeholder="Укажите пароль"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="registration-form__btn form-btn" type="submit">
          Зарегистрироваться
        </button>
        <span className="another-form" onClick={onSwitch}>
          Уже есть аккаунт
        </span>
      </form>
    </div>
  );
};

export default Registration;
