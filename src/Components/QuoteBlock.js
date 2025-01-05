import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { FaSpinner } from 'react-icons/fa';
import {
  setAddQuote,
  setDeleteQuote,
  selectQuote,
} from './redux/slices/quotesSlice';
import { setError } from './redux/slices/errorSlice';
import generateRandomQuote from './utils/generateRandomQuote';
import { generateRandomQuoteAPI } from './utils/generateRandomQuoteAPI';
import checkQuoteWithID from './utils/checkQuoteWithID';

const QuoteBlock = () => {
  const [currentQuote, setCurrentQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const favoriteQuotes = useSelector(selectQuote);
  const dispatch = useDispatch();

  const handleGenNewQuote = () => {
    const randomQuote = generateRandomQuote();

    const newQuote = checkQuoteWithID(favoriteQuotes, randomQuote);
    setCurrentQuote(newQuote);
  };

  const handleGetApiQuote = async () => {
    try {
      setIsLoading(true);
      const newQuote = await generateRandomQuoteAPI(favoriteQuotes);
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
  };

  const isFavorite = favoriteQuotes.some(
    (quote) =>
      quote.text === currentQuote.text && quote.author === currentQuote.author
  );

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      dispatch(setAddQuote(currentQuote));
    } else {
      dispatch(setDeleteQuote(currentQuote.id));
    }
  };

  useEffect(() => {
    const randomQuote = generateRandomQuote();

    if (randomQuote.id) {
      setCurrentQuote(randomQuote);
    } else {
      setCurrentQuote({ ...randomQuote, id: uuid4() });
    }
  }, [dispatch]);

  return (
    <>
      <div className="quotes-content">
        {currentQuote.text ? (
          <>
            <p className="quotes-content-text">{currentQuote.text}</p>
            <p className="quotes-content-author">{currentQuote.author}</p>
          </>
        ) : (
          <p>Произошла ошибка</p>
        )}
      </div>
      <div className="quotes-btn">
        <button className="generate-btn btn" onClick={handleGenNewQuote}>
          Cгенерировать новую
        </button>
        <span
          className={`favorites-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleAddToFavorites}
        >
          ★
        </span>
        <button
          className="own-api-btn btn"
          onClick={handleGetApiQuote}
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="spinner" />
          ) : (
            'Получить со своего API'
          )}
        </button>
      </div>
    </>
  );
};

export default QuoteBlock;
