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
    <>
      <Logo />
      <p className="auth-form__text">
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
      <form className="auth-form " onSubmit={onSubmitHandler}>
        <input
          name="username"
          placeholder="Придумай себе погоняло"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          name="name"
          placeholder="Как тебя зовут, сынок?"
          type="text"
          onChange={handleChange}
          value={form.name}
        />
        <input
          name="password"
          placeholder="Зашифруйся как следует"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="popup-btn_active" type="submit">
          Зарегистрироваться
        </button>
        <span className="auth-form__bottom-link" onClick={onSwitch}>
          Уже есть аккаунт
        </span>
      </form>
    </>
  );
};

export default Registration;
