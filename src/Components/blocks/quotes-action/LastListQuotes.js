import { useSelector } from 'react-redux';
import { gsap } from 'gsap';
import { selectShareQuote } from '../../redux/slices/shareQuotesSlice';
import { useEffect, useRef } from 'react';

const MAX_QUOTES = 4;
const MAX_TEXT_LENGTH = 100;

const LastListQuotes = () => {
  const lastQuotes = useSelector(selectShareQuote);
  const quoteLimit = lastQuotes.slice(0, MAX_QUOTES);
  const listRef = useRef(null);

  const limitTextLength = (text) => {
    if (text.length > MAX_TEXT_LENGTH) {
      return `${text.slice(0, MAX_TEXT_LENGTH)}...`;
    }
    return text;
  };

  useEffect(() => {
    if (lastQuotes.length > 0) {
      const firstElement = listRef.current?.firstElementChild;
      if (firstElement) {
        gsap.fromTo(
          firstElement,
          { opacity: 0, x: -100 }, // Начальное состояние
          { opacity: 1, x: 0, duration: 1, ease: 'power2.out' } // Конечное состояние
        );
      }
    }
  }, [lastQuotes]);

  return (
    <div className="quotes-action__last-quotes quotes-action__card card">
      <div className="action__card_text">
        <h3 className="action__card_title card-title">
          Последние мысли Джейсона Стетхема
        </h3>
      </div>
      <ul className="last__list-qoutes" ref={listRef}>
        {quoteLimit.map((quote, index) => {
          return (
            <li className="last__list-qoutes_item" key={quote.id}>
              <div className="quotes-item">
                <div className="quotes-item__content">
                  <div className="quotes-item__author">
                    <div className="quotes-author__profile">
                      <div className="profile__logo">
                        <img src="src/img/profile-logo.png" alt="Logo" />
                      </div>
                    </div>
                  </div>
                  <div className="quotes-item__quote">
                    <p>{limitTextLength(quote.text)}</p>
                    <div className="quotes-item__quote_botom">
                      <div className="last-quotes__handler">
                        <i className="fa-solid fa-thumbs-up icon"></i>
                        <i className="fa-regular fa-star icon"></i>
                      </div>
                      <div className="last-quotes__date">
                        <p>{quote.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LastListQuotes;
