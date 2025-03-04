import { forwardRef } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { limitTextLength } from '../../utils/limitTextLength.js';
import useHandleLike from '../../Hooks/useHandleLike.js';
import steps from '../../utils/steps.js';

const QuotesCard = forwardRef(({ quote }, ref) => {
  const handleLike = useHandleLike();
  const userLevel = quote?.userId?.level;
  console.log(quote);
  return (
    <div className="quotes-block__column">
      <div className="quotes-block__card card" ref={ref}>
        <div className="quotes-block__card_person">
          <div className="quotes-block__card_logo">
            <img src="src/img/profile-logo.png" alt="Logo" />
          </div>

          <div className="quotes-block__card_rang">
            <p>
              {steps[userLevel]?.title ? steps[userLevel]?.title : 'Новичок'}
            </p>
          </div>
        </div>
        <div className="quotes-block__card_content">
          <div className="quotes-block__card_name">{quote.author}</div>
          <div className="quotes-block__card_text">
            <p>
              <i>{`«${limitTextLength(quote.text)}»`}</i>
            </p>
          </div>
        </div>
        <div className="quotes-block__card_handler">
          <div className="card-handler">
            <AiFillLike
              onClick={() => handleLike(quote._id)}
              className="handler-icon"
            />
            <p>{quote.likes}</p>
          </div>
          <div className="card-handler">
            <FaComment className="handler-icon" />2
          </div>
          <div className="card-handler">
            <IoIosShareAlt className="handler-icon" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuotesCard;
