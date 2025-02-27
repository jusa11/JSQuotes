import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const SearchForm = () => {
  const { username } = useSelector(selectUser);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const type = useSelector(selectType);
  const results = useSelector(selectResults);
  const [activeFilter, setActiveFilter] = useState('all');

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

  return (
    <>
      <div className="content-main__card_big search-quote__container card">
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

      {results.map((quote) => (
        <QuotesCard className="card" quote={quote} key={quote._id} />
      ))}
    </>
  );
};

export default SearchForm;
