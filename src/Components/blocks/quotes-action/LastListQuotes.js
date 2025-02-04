import { useSelector, useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import {
  selectShareQuote,
  setLastQuotes,
} from '../../redux/slices/shareQuotesSlice';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { setError } from '../../redux/slices/errorSlice';

const MAX_TEXT_LENGTH = 100;

const LastListQuotes = () => {
  const lastQuotes = useSelector(selectShareQuote);
  console.log(lastQuotes);
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const limitTextLength = (text) => {
    if (text.length > MAX_TEXT_LENGTH) {
      return `${text.slice(0, MAX_TEXT_LENGTH)}...`;
    }
    return text;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios('http://localhost:5000/last-quotes');
        console.log(res.data);
        dispatch(setLastQuotes(res.data));
      } catch (error) {
        console.error('Ошибка при загрузке цитат', error);
        dispatch(setError('Ошибка при загрузке цитат'));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (listRef.current?.firstElementChild) {
      gsap.fromTo(
        listRef.current.firstElementChild,
        { opacity: 0, x: -100 }, // Начальное состояние
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' } // Конечное состояние
      );
    }
  }, [lastQuotes]);

  return (
    <div className="quotes-action__last-quotes quotes-action__card card">
      <div className="action__card_text">
        <h3 className="action__card_title card-title">
          Последние мысли Джейсона Стетхема
        </h3>
      </div>
      <ul className="last__list-qoutes" ref={listRef}>
        {lastQuotes.map((quote) => {
          return (
            <li
              className="last__list-qoutes_item"
              key={quote._id || quote.text}
            >
              <div className="quotes-item">
                <div className="quotes-item__content">
                  <div className="quotes-item__author">
                    <div className="quotes-author__profile">
                      <div className="profile__logo">
                        <img src="src/img/profile-logo.png" alt="Logo" />
                      </div>
                    </div>
                  </div>
                  <div className="quotes-item__quote">
                    <p>{limitTextLength(quote.text)}</p>
                    <div className="quotes-item__quote_botom">
                      <div className="last-quotes__handler">
                        <i className="fa-solid fa-thumbs-up icon"></i>
                        <i className="fa-regular fa-star icon"></i>
                      </div>
                      <div className="last-quotes__date">
                        <p>
                          {new Date(quote.date).toLocaleDateString('ru-Ru')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LastListQuotes;
