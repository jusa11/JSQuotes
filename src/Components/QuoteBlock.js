import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import {
  setAddQuote,
  setDeleteQuote,
  selectQuote,
} from './redux/slices/quotesSlice';
import generateRandomQuote from './utils/generateRandomQuote';
import { generateRandomQuoteAPI } from './utils/generateRandomQuoteAPI';
import checkQuoteWithID from './utils/checkQuoteWithID';

const QuoteBlock = () => {
  const [currentQuote, setCurrentQuote] = useState({});
  const favoriteQuotes = useSelector(selectQuote);
  const dispatch = useDispatch();

  const handleGenNewQuote = () => {
    const randomQuote = generateRandomQuote();
    const newQuote = checkQuoteWithID(favoriteQuotes, randomQuote);
    if (newQuote) {
      setCurrentQuote(newQuote);
    } else {
      console.error('Произошла ошибка');
    }
  };

  const handleGetApiQuote = async () => {
    try {
      const newQuote = await generateRandomQuoteAPI(favoriteQuotes);
      if (newQuote) {
        setCurrentQuote(newQuote);
      } else {
        console.error('API вернул невалидное значение');
      }
    } catch (error) {
      setCurrentQuote(false);
      console.log('error ' + error);
    }
  };

  const isFavorite = favoriteQuotes.some(
    (quote) =>
      quote.text === currentQuote.text && quote.author === currentQuote.author
  );

  const handleAddToFavorites = () => {
    console.log('Кнопка избранного нажата, текущее состояние:', currentQuote);
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
  }, []);

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
          Сгенерировать новую
        </button>
        <span
          className={`favorites-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleAddToFavorites}
        >
          ★
        </span>
        <button className="own-api-btn btn" onClick={handleGetApiQuote}>
          Получить со своего API
        </button>
      </div>
    </>
  );
};

export default QuoteBlock;
