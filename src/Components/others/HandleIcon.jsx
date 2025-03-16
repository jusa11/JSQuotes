import { AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import useHandleLike from '../../Hooks/useHandleLike.js';
import { useSelector } from 'react-redux';
import { selectLikedQuotes } from '../redux/slices/likedQuotesSlice.js';

const HandleIcon = ({ quote }) => {
  const handleLike = useHandleLike();
  const likedQuotes = useSelector(selectLikedQuotes);
  const foundQuote = likedQuotes.find((q) => q._id === quote._id);
  const likes = foundQuote ? foundQuote.likes : quote.likes;

  return (
    <div className="quotes-block__card_handler">
      <div className="card-handler">
        <AiFillLike
          onClick={() => handleLike(quote._id)}
          className="handler-icon"
        />
        <p>{likes}</p>
      </div>
      <div className="card-handler">
        <FaComment className="handler-icon" />2
      </div>
      <div className="card-handler">
        <IoIosShareAlt className="handler-icon" />
      </div>
    </div>
  );
};

export default HandleIcon;
