import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { gsap } from 'gsap';
import { AiFillLike } from 'react-icons/ai';
import {
  selectDisplayLastQuotes,
  selectDisplayPopularQuotes,
  selectDisplayUserQuotes,
  setLastQuotes,
  setPopularQuotes,
  setQuotesUser,
} from '../../redux/slices/displayQuotesSlice';
import {
  setLikedQuotes,
  selectLikedQuotes,
  toggleLike,
} from '../../redux/slices/likedQuotesSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { setError } from '../../redux/slices/errorSlice';
import {
  MAX_TEXT_LENGTH,
  MAX_QUOTES,
  POPULAR_URL,
  LAST_QUOTES_URL,
  QUOTES_URL,
  LIKED_QUOTES,
  LIKE,
} from '../../../config';

const ListQuotes = ({ url, title }) => {
  const lastQuotes = useSelector(selectDisplayLastQuotes);
  const popularQuotes = useSelector(selectDisplayPopularQuotes);
  const userQuotes = useSelector(selectDisplayUserQuotes);
  const likedQuotes = useSelector(selectLikedQuotes);
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const { username } = useSelector(selectUser);

  const handleLike = async (quoteId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Нет токена! Пользователь не авторизован.');
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/${LIKE.replace(':quoteId', quoteId)}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { quantity } = res.data;

      const allQuotes = [
        ...lastQuotes,
        ...popularQuotes,
        ...userQuotes,
        ...likedQuotes,
      ];
      const foundQuote = allQuotes.find((quote) => quote._id === quoteId);

      if (foundQuote) {
        dispatch(toggleLike({ ...foundQuote, likes: quantity }));
      }
    } catch (error) {
      dispatch(setError('Ошибка при лайке цитаты'));
      console.error('Ошибка при лайке цитаты:', error);
    }
  };

  const getQuotes = useCallback(() => {
    if (url === 'last-quotes') return lastQuotes;
    if (url === 'popular-quotes') return popularQuotes;
    if (url === QUOTES_URL.replace(':username', username)) return userQuotes;
    if (url === LIKED_QUOTES.replace(':username', username)) return likedQuotes;
    return [];
  }, [url, lastQuotes, popularQuotes, userQuotes, username, likedQuotes]);

  const quotes = getQuotes();
  const limitQuotes = quotes.length > 0 ? quotes.slice(0, MAX_QUOTES) : 'Пусто';

  const limitTextLength = (text) => {
    if (!text) return '';
    return text.length > MAX_TEXT_LENGTH
      ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
      : text;
  };

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const res = await axios(`http://localhost:5000/${url}`);

        if (url === POPULAR_URL) {
          dispatch(setPopularQuotes(res.data));
        }
        if (url === LAST_QUOTES_URL) {
          dispatch(setLastQuotes(res.data));
        }
        if (url === QUOTES_URL.replace(':username', username)) {
          dispatch(setQuotesUser(res.data));
        }
        if (url === LIKED_QUOTES.replace(':username', username)) {
          if (JSON.stringify(res.data) !== JSON.stringify(likedQuotes)) {
            dispatch(setLikedQuotes(res.data));
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке цитат', error);
        dispatch(setError('Ошибка при загрузке цитат'));
      }
    })();
  }, [dispatch, url, username, likedQuotes]);

  useEffect(() => {
    if (listRef.current?.firstElementChild) {
      gsap.fromTo(
        listRef.current.firstElementChild,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
      );
    }
  }, [quotes]);

  return (
    <div className="quotes-action__last-quotes quotes-action__card card">
      <div className="action__card_text">
        <h3 className="action__card_title card-title">{title}</h3>
      </div>
      <ul className="last__list-qoutes" ref={listRef}>
        {typeof limitQuotes === 'string' ? (
          <p>Пусто</p>
        ) : (
          limitQuotes.map((quote, index) => {
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
                          <AiFillLike onClick={() => handleLike(quote._id)} />
                          <p>{quote.likes}</p>
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
          })
        )}
      </ul>
    </div>
  );
};

export default ListQuotes;
