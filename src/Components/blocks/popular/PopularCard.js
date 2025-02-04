import { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import { setError } from '../../redux/slices/errorSlice';

const PopularCard = ({ quotes }) => {
  const [likes, setLikes] = useState({});
  const MAX_TEXT_LENGTH = 100;

  const limitTextLength = (text) => {
    if (text.length > MAX_TEXT_LENGTH) {
      return `${text.slice(0, MAX_TEXT_LENGTH)}...`;
    }
    return text;
  };

  useEffect(() => {
    const initialLikes = quotes.reduce((acc, quote) => {
      acc[quote._id] = quote.likes;
      return acc;
    }, []);
    setLikes(initialLikes);
  }, [quotes]);

  const handleLike = async (quote) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/quotes/${quote._id}/like`
      );
      setLikes((prevLikes) => ({
        ...prevLikes,
        [quote._id]: res.data.likes,
      }));
    } catch (error) {
      console.error('Ошибка при лайке цитаты', error);
      setError(error);
    }
  };

  return (
    <div className="popular__content">
      <Splide
        options={{
          type: 'loop',
          perPage: 2,
          focus: 'center',
          arrows: true,
          pagination: false,
          wheel: true,
          breakpoints: {
            768: {
              direction: 'ttb',
              perPage: 1.5,
              height: '450px',
              arrows: true,
              pagination: false,
            },
          },
        }}
      >
        {quotes.map((quote, index) => (
          <SplideSlide key={index}>
            <div className="popular__column">
              <div className="popular__card card">
                <div className="popular__card_title">
                  <div className="popular__card_logo">
                    <img src="src/img/profile-logo.png" alt="Logo" />
                  </div>
                  <div className="popular__card_rang">
                    <p>Шестерка</p>
                  </div>
                </div>
                <div className="popular__card_content">
                  <div className="popular__card_name">{quote.author}</div>
                  <div className="popular__card_text">
                    <p>
                      <i>{limitTextLength(quote.text)}</i>
                    </p>
                  </div>
                </div>
                <div className="popular__card_handler">
                  <button className="popular__card_infavorite btn">
                    <i className="fa-regular fa-star"></i> В избранное
                  </button>
                  <div className="rating">
                    <button onClick={() => handleLike(quote)}>
                      ❤️ {likes[quote._id]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default PopularCard;
