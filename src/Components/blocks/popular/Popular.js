import { useEffect, useState } from 'react';
import axios from 'axios';
import PopularCard from './PopularCard';
import { setError } from '../../redux/slices/errorSlice';
import { POPULAR_URL } from '../../../config';

const Popular = () => {
  const [popularQuotes, setPopularQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${POPULAR_URL}`);
        setPopularQuotes(res.data);
      } catch (error) {
        console.error('Ошибка при загрузке популярных цитат', error);
        setError(error);
      }
    })();
  }, []);

  return (
    <section id="popular">
      <h2 className="popular__title title">Популярные мысли</h2>
      <PopularCard quotes={popularQuotes} />
    </section>
  );
};

export default Popular;
