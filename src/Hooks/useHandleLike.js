import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  selectDisplayLastQuotes,
  selectDisplayPopularQuotes,
} from '../Components/redux/slices/displayQuotesSlice';
import { setError } from '../Components/redux/slices/notificationsSlice';
import { selectDisplayUserQuotes } from '../Components/redux/slices/displayQuotesSlice';
import {
  toggleLike,
  selectLikedQuotes,
} from '../Components/redux/slices/likedQuotesSlice';
import { LIKE } from '../config';

const useHandleLike = () => {
  const lastQuotes = useSelector(selectDisplayLastQuotes);
  const popularQuotes = useSelector(selectDisplayPopularQuotes);
  const userQuotes = useSelector(selectDisplayUserQuotes);
  const likedQuotes = useSelector(selectLikedQuotes);
  const dispatch = useDispatch();

  const handleLike = async (quoteId) => {
    const token = localStorage.getItem('token');
    console.log('like');
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

  return handleLike;
};

export default useHandleLike;
