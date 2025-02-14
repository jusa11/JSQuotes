import { limitTextLength } from '../../utils/limitTextLength.js';

const QuotesCard = ({ quote }) => {
  return (
    <div className="quotes-block__column">
      <div className="quotes-block__card card">
        <div className="quotes-block__card_title">
          <div className="quotes-block__card_logo">
            <img src="src/img/profile-logo.png" alt="Logo" />
          </div>
          <div className="quotes-block__card_rang">
            <p>Шестерка</p>
          </div>
        </div>
        <div className="quotes-block__card_content">
          <div className="quotes-block__card_name">{quote.author}</div>
          <div className="quotes-block__card_text">
            <p>
              <i>{limitTextLength(quote.text)}</i>
            </p>
          </div>
        </div>
        <div className="quotes-block__card_handler">
          <button className="quotes-block__card_infavorite btn">
            <i className="fa-regular fa-star"></i> В избранное
          </button>
          <div className="rating"></div>
        </div>
      </div>
    </div>
  );
};

export default QuotesCard;
