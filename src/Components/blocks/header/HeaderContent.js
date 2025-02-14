import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { FaQuoteLeft, FaStar } from 'react-icons/fa6';
import {
  setAddQuote,
  setDeleteQuote,
  selectQuote,
} from '../../redux/slices/quotesSlice.js';
import { setError } from '../../redux/slices/errorSlice.js';
import { generateRandomQuoteAPI } from '../../../utils/generateRandomQuoteAPI.js';

const HeaderContent = () => {
  const [currentQuote, setCurrentQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const favoriteQuotes = useSelector(selectQuote);
  const dispatch = useDispatch();

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
            <FaSpinner className="spinner" />
          ) : currentQuote.text ? (
            <>
              <p className="quote__text">{currentQuote.text}</p>
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
