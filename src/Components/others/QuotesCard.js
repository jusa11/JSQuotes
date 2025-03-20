import { forwardRef, useEffect } from 'react';
import gsap from 'gsap';
import { limitTextLength } from '../../utils/limitTextLength.js';
import HandleIcon from './HandleIcon.jsx';
import steps from '../../utils/steps.js';
import { MAX_TEXT_LENGTH } from '../../config.js';

const QuotesCard = forwardRef(({ quote, isPopup }, ref) => {
  const userLevel = quote?.userId?.level;

  useEffect(() => {
    if (isPopup && ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power1.out',
        }
      );
    }
  }, [isPopup, ref]);

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
