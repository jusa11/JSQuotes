import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import quotes from '../../../data/qoutes'; // даллее будет приходить информация о популярных цитатх с сервера

const Popular = () => {
  return (
    <>
      <section className="popular">
        <h2 className="popular__title title">Популярные мысли</h2>

        <div className="popular__content">
          <div className="popular__content swiper-container">
            <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper">
              {quotes.map((quote, index) => {
                return (
                  <SwiperSlide>
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
                            <i>{quote.text}</i>
                          </p>
                        </div>
                      </div>
                      <div className="popular__card_handler">
                        <button className="popular__card_infavorite btn">
                          <i className="fa-regular fa-star"></i> В избранное
                        </button>
                        <div className="rating">rating</div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
