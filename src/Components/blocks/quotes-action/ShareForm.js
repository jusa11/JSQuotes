import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowUp } from 'react-icons/fa6';
import { setAddShareQuotes } from '../../redux/slices/shareQuotesSlice';
import { setError } from '../../redux/slices/errorSlice';

const ShareForm = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const addQuote = (text) => {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);

    const newQuote = {
      text,
      date: formattedDate,
      id: uuidv4(),
    };

    dispatch(setAddShareQuotes(newQuote));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (message) {
      addQuote(message);
      setMessage('');
    } else {
      dispatch(setError('Поле не должно быть пустым'));
    }
  };

  return (
    <div className="quotes-action__share-quote quotes-action__card card">
      <div className="action__card_text">
        <h3 className="action__card_title card-title">Поделись мыслями</h3>
        <p className="action__card_subtitle card-subtitle">
          Все мысли являются собственностью Джейсона Стетхема. Но ты можешь ими
          со всеми поделиться
        </p>
      </div>

      <div className="share__qoute_form-container">
        <div className="share__qoute-form-icon icon">
          <i className="fa-regular fa-lightbulb"></i>
        </div>
        <form
          className="share__qoute-form"
          action="#"
          method="post"
          onSubmit={onSubmitHandler}
        >
          <input
            name="message"
            id="yourMessage"
            className="your-message"
            placeholder="Отправь мысль во вселенную"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            maxLength={500}
          />
          <button className="form-btn" type="submit">
            <FaArrowUp className="form-btn-icon" />
          </button>
        </form>
        <div className="form__handler">
          <i className="fa-regular fa-face-smile icon"></i>
          <div className="form__button"></div>
        </div>
      </div>
    </div>
  );
};

export default ShareForm;
