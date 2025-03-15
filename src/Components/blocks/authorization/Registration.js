import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../../redux/slices/userSlice';
import Logo from '../../others/Logo';
import { useNavigate } from 'react-router-dom';

const Registration = ({ onSwitch }) => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '',
    logo: '',
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setForm({ ...form, logo: file });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      dispatch(setError('Не заполнены обязательные поля'));
      return;
    }

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('name', form.name);
    formData.append('password', form.password);
    if (form.logo) {
      formData.append('logo', event.target.logo.files[0]);
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/auth/registration/',
        formData
      );
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decode = jwtDecode(token);
      console.log(decode);

      dispatch(
        setUser({
          username: decode.username,
          userId: decode._id,
          logo: decode.logo,
        })
      );
      navigate('/profile');
      dispatch(setSuccess('Добро пожаловать в сообщество!'));
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
        <input
          name="logo"
          type="file"
          onChange={(e) => {
            handleFileChange(e);
            handleChange(e);
          }}
        />
        {preview && (
          <img
            src={preview}
            alt="Лого"
            style={{ width: '100px', height: '100px' }}
          />
        )}
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
