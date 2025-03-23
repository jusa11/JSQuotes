import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import Popup from 'reactjs-popup';
import {
  selectDisplayLastQuotes,
  selectDisplayPopularQuotes,
  selectDisplayUserQuotes,
  setLastQuotes,
  setPopularQuotes,
  setQuotesUser,
  selectDisplayIsChange,
} from '../redux/slices/displayQuotesSlice';
import {
  setLikedQuotes,
  selectLikedQuotes,
} from '../redux/slices/likedQuotesSlice';
import { selectUser } from '../redux/slices/userSlice';
import { setError } from '../redux/slices/notificationsSlice';
import {
  MAX_QUOTES,
  POPULAR_URL,
  LAST_QUOTES_URL,
  QUOTES_URL,
  LIKED_QUOTES,
  MAX_TEXT_LENGTH_ITEM,
} from '../../config';
import { limitTextLength } from '../../utils/limitTextLength';
import { useOutletRef } from '../../Hooks/useOutletRef';
import QuotesCard from './QuotesCard';
import HandleIcon from './HandleIcon';
import { useLocation } from 'react-router-dom';

const ListQuotes = ({ url, title }) => {
  const lastQuotes = useSelector(selectDisplayLastQuotes);
  const popularQuotes = useSelector(selectDisplayPopularQuotes);
  const userQuotes = useSelector(selectDisplayUserQuotes);
  const likedQuotes = useSelector(selectLikedQuotes);
  const listRef = useRef(null);
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const { username } = useSelector(selectUser);
  const ref = useRef(null);
  const outletRef = useOutletRef();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isPopup, setPopup] = useState(false);
  const location = useLocation();
  const isChange = useSelector(selectDisplayIsChange);

  const getQuotes = useCallback(() => {
    if (url === 'quotes/last-quotes') return lastQuotes;
    if (url === 'quotes/popular') return popularQuotes;
    if (url === QUOTES_URL.replace(':username', username)) return userQuotes;
    if (url === LIKED_QUOTES.replace(':username', username)) return likedQuotes;
    return [];
  }, [url, lastQuotes, popularQuotes, userQuotes, username, likedQuotes]);

  const quotes = getQuotes();
  const limitQuotes = quotes.length > 0 ? quotes.slice(0, MAX_QUOTES) : 'Пусто';

  useEffect(() => {
    const token = localStorage.getItem('token');

    (async () => {
      try {
        const res = await axios(`http://localhost:5000/${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (url === POPULAR_URL) {
          dispatch(setPopularQuotes(res.data));
        }
        if (url === LAST_QUOTES_URL) {
          dispatch(setLastQuotes(res.data));
        }
        if (username) {
          if (url === QUOTES_URL.replace(':username', username)) {
            dispatch(setQuotesUser(res.data));
          }
          if (url === LIKED_QUOTES.replace(':username', username)) {
            if (JSON.stringify(res.data) !== JSON.stringify(likedQuotes)) {
              dispatch(setLikedQuotes(res.data));
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке цитат', error);
        dispatch(setError('Ошибка при загрузке цитат'));
      }
    })();
  }, [dispatch, url, username, likedQuotes]);

  useEffect(() => {
    if (location.pathname === '/' && isChange) {
      if (listRef.current && isChange) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 993px)', () => {
          gsap.fromTo(
            listRef.current,
            { opacity: 0, y: 250, x: -1000 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: 'easy.in',
            }
          );
        });

        mm.add('(max-width: 992px)', () => {
          gsap.fromTo(
            listRef.current,
            { opacity: 0, y: -700 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'easy.in',
            }
          );
        });
      }
    }
  }, [location.pathname, isChange]);

  useEffect(() => {
    if (ref.current && !outletRef.current.includes(ref.current)) {
      outletRef.current.push(ref.current);
    }
  }, [outletRef]);

  const showQuote = (index) => {
    setSelectedQuote(null);
    setTimeout(() => {
      setSelectedQuote(limitQuotes[index]);
    }, 0);
  };

  useEffect(() => {
    if (selectedQuote) {
      setPopup(true);
    }
  }, [selectedQuote]);

  return (
    <>
      <div className="quotes-action__card card right-card">
        <div className="action__card_text">
          <h3 className="action__card_title card-title">{title}</h3>
        </div>
        <ul className="last__list-qoutes">
          {typeof limitQuotes === 'string' ? (
            <p>Пусто</p>
          ) : (
            limitQuotes.map((quote, index) => {
              return (
                <li
                  ref={listRef}
                  className="last__list-qoutes_item"
                  key={quote._id}
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
                        <p onClick={() => showQuote(index)}>
                          {limitTextLength(quote.text, MAX_TEXT_LENGTH_ITEM)}
                        </p>
                        <div className="quotes-item__quote_botom">
                          <div className="last-quotes__handler">
                            <HandleIcon quote={quote} />
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
      <Popup
        open={isPopup}
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.7)' }}
        onClose={() => setPopup(false)}
      >
        <QuotesCard
          className="card"
          quote={selectedQuote}
          ref={popupRef}
          isPopup={isPopup}
        />
      </Popup>
    </>
  );
};

export default ListQuotes;
