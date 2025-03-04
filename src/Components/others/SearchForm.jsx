import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { selectUser } from '../redux/slices/userSlice';
import {
  selectQuery,
  selectResults,
  selectType,
  setQuery,
  setResult,
  setType,
} from '../redux/slices/searchSlice';
import { fetchSearch } from '../redux/slices/searchSlice';
import QuotesCard from './QuotesCard';
import { useOutletRef } from '../../Hooks/useOutletRef';

gsap.registerPlugin(ScrollTrigger);

const SearchForm = () => {
  const { username } = useSelector(selectUser);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const type = useSelector(selectType);
  const results = useSelector(selectResults);
  const [activeFilter, setActiveFilter] = useState('all');
  const quotesCardRef = useRef([]);
  const ref = useRef(null);
  const outletRef = useOutletRef();
  quotesCardRef.current = [];

  const handleSearch = async (e) => {
    const value = e.target.value;

    if (!value.trim()) {
      dispatch(setQuery(''));
      dispatch(setResult([]));
      return;
    }

    dispatch(setQuery(value));

    dispatch(fetchSearch({ query: value, type, username }));
  };

  const handleFilter = (e) => {
    const value = e.target.value;

    setActiveFilter(value);
    dispatch(setType(value));
  };

  useEffect(() => {
    if (quotesCardRef.current.length > 0) {
      quotesCardRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              // y: 0,
              scale: 1,
              delay: 0.1 * index,
              ease: 'power1.out',
            }
          );
        }
      });
    }
  }, [results]);

  useEffect(() => {
    if (ref.current && !outletRef.current.includes(ref.current)) {
      outletRef.current.push(ref.current);
    }
  }, [outletRef]);

  return (
    <>
      <div
        className="content-main__card_big search-quote__container card"
        ref={ref}
      >
        <h3 className="action__card_title card-title">Найти цитату</h3>
        <div className="search-filter">
          <button
            className={`search-filter__item filter-all ${
              activeFilter === 'all' ? 'filter-active' : ''
            }`}
            value="all"
            onClick={(e) => handleFilter(e)}
          >
            Во вселенной
          </button>
          <button
            className={`search-filter__item filter-added ${
              activeFilter === 'user' ? 'filter-active' : ''
            }`}
            value="user"
            onClick={(e) => handleFilter(e)}
          >
            Мои
          </button>
          <button
            className={`search-filter__item filter-liked ${
              activeFilter === 'liked' ? 'filter-active' : ''
            }`}
            value="liked"
            onClick={(e) => handleFilter(e)}
          >
            Мне понравились
          </button>
        </div>

        <input
          type="text"
          name="message"
          id="yourMessage"
          className="searh-quote__query"
          placeholder="Запрос во вселленную"
          value={query}
          onChange={(e) => handleSearch(e)}
        />
        <button className="form-reset"></button>
      </div>

      {results.map((quote, index) => (
        <QuotesCard
          ref={(el) => (quotesCardRef.current[index] = el)}
          className="card"
          quote={quote}
          key={quote._id}
        />
      ))}
    </>
  );
};

export default SearchForm;
