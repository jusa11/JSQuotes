import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/errorSlice';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();

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
      // Здесь можно сохранить токен (например, в localStorage или Redux)
      alert(`Авторизация успешна. Токен: ${res.data.token}`);
      // Или выполнить редирект на защищенную страницу
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Ошибка при авторизации')
      );
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <input
          className="login-form__username"
          name="username"
          placeholder="Укажите логин"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          className="login-form__password"
          name="password"
          placeholder="Укажите пароль"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="login-form__btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
