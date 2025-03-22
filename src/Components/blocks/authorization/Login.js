import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import { setUser } from '../../redux/slices/userSlice';
import Logo from '../../others/Logo';
import api from '../../../utils/axiosInstance';

const Login = ({ onSwitch }) => {
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
      dispatch(setError('Заполни все поля, сынок'));
      return;
    }

    try {
      const res = await api.post('http://localhost:5000/auth/login', form);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setSuccess('Приветствуем тебя, брат!'));

      const decode = jwtDecode(accessToken);
      console.log(decode);

      dispatch(
        setUser({
          username: decode.username,
          userId: decode._id,
          logo: decode.logo,
        })
      );
      navigate('/profile');
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Ошибка при авторизации')
      );
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <>
      <Logo />
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <input
          name="username"
          placeholder="Скажи своё погоняло"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          name="password"
          placeholder="Скажи шифр"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="popup-btn_active">Войти</button>
        <span className="auth-form__bottom-link" onClick={onSwitch}>
          Еще нет аккаунта
        </span>
      </form>
    </>
  );
};

export default Login;
