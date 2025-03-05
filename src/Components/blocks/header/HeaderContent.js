import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { FaQuoteLeft, FaStar } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  setAddQuote,
  setDeleteQuote,
  selectQuote,
} from '../../redux/slices/quotesSlice.js';
import { setError } from '../../redux/slices/notificationsSlice';
import { generateRandomQuoteAPI } from '../../../utils/generateRandomQuoteAPI.js';

gsap.registerPlugin(ScrollTrigger);

const HeaderContent = () => {
  const [currentQuote, setCurrentQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const favoriteQuotes = useSelector(selectQuote);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ScrollTrigger.isTouch) {
      gsap.from('.header__content', {
        opacity: 0,
        y: 400,
        duration: 1,
        scrollTrigger: {
          trigger: '.header__content',
        },
      });

      gsap.fromTo(
        '.header__content',
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: '.header__content',
            start: 'top%', //
            end: '1000',
            scrub: true,
          },
        }
      );
    }
  }, []);

  const handleGetApiQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      const newQuote = await generateRandomQuoteAPI();
      if (newQuote) {
        setCurrentQuote(newQuote);
      } else {
        console.error('API вернул невалидное значение');
      }
    } catch (error) {
      setCurrentQuote(false);
      console.log('error ' + error);
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const isFavorite = favoriteQuotes.some(
    (quote) =>
      quote.text === currentQuote.text && quote.author === currentQuote.author
  );

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      dispatch(setAddQuote(currentQuote));
    }
    if (isFavorite) {
      dispatch(setDeleteQuote(currentQuote.id));
    }
    if (!currentQuote.text) {
      console.log('err');
    }
  };

  useEffect(() => {
    (async () => {
      await handleGetApiQuote();
    })();
  }, [handleGetApiQuote]);

  return (
    <div className="header__content">
      <h1 className="main-title title" id="generator">
        Вселенная Джейсона Стетхема
      </h1>

      <div className="header__quote">
        <div className="header__quote_content">
          {isLoading ? (
            <FaSpinner className="spinner isloading-quote" />
          ) : currentQuote.text ? (
            <>
              <p className="quote__text" style={{ opacity: isLoading ? 0 : 1 }}>
                {currentQuote.text}{' '}
              </p>
              <p className="quote__author">{`(Поделился: ${currentQuote.author})`}</p>
            </>
          ) : (
            <>
              <p className="quote__text">Произошла ошибка</p>
            </>
          )}
        </div>
        <div className="header__quote_btn">
          <button
            className="button-quote btn"
            onClick={handleGetApiQuote}
            disabled={isLoading}
          >
            <FaQuoteLeft />
            Сгенерировать
          </button>
          <button className="button-quote btn" onClick={handleAddToFavorites}>
            <FaStar />В избранное
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
