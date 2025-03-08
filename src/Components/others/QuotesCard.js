import { forwardRef } from 'react';
import { limitTextLength } from '../../utils/limitTextLength.js';
import HandleIcon from './HandleIcon.jsx';
import steps from '../../utils/steps.js';
import { MAX_TEXT_LENGTH } from '../../config.js';

const QuotesCard = forwardRef(({ quote }, ref) => {
  
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
              <i>{`«${limitTextLength(quote.text, MAX_TEXT_LENGTH)}»`}</i>
            </p>
          </div>
        </div>
        <HandleIcon quote={quote} />
      </div>
    </div>
  );
});

export default QuotesCard;
