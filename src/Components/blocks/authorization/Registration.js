import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/errorSlice';
import axios from 'axios';

const Registration = () => {
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
      dispatch(setError('Не заполнены обязательные поля'));
      return;
    }
    console.log(form);
    try {
      // Обращаемся к серверу по маршруту /api/auth/register
      const res = await axios.post(
        'http://localhost:5000/auth/registration/',
        form
      );

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
    <div className="registration">
      <form className="registration-form" onSubmit={onSubmitHandler}>
        <input
          className="registration-form__login"
          name="username"
          placeholder="Укажите логин"
          type="text"
          onChange={handleChange}
          value={form.username}
        />
        <input
          className="registration-form__password"
          name="password"
          placeholder="Укажите пароль"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="registration-form__btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
