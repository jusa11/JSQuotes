import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/errorSlice';
import { setUser } from '../../redux/slices/userSlice';
import Logo from '../Logo';

const Login = ({ onSwitch, onClose }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      dispatch(setError('Заполните все поля'));
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/auth/login', form);
      const { token } = res.data;

      localStorage.setItem('token', token);
      dispatch(setError('Авторизация прошла успешно'));
      const decode = jwtDecode(token);
      dispatch(setUser({ username: decode.username}));
      navigate('/profile');
      onClose();
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Ошибка при авторизации')
      );
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <div className="authorization">
      <Logo />
      <form
        className="login-form authorization-form"
        onSubmit={onSubmitHandler}
      >
        <input
          className="login-form__username form-login"
          name="username"
          placeholder="Укажите логин"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          className="login-form__password form-password"
          name="password"
          placeholder="Укажите пароль"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="login-form__btn form-btn" type="submit">
          Войти
        </button>
        <span className="another-form" onClick={onSwitch}>
          Еще нет аккаунта
        </span>
      </form>
    </div>
  );
};

export default Login;
