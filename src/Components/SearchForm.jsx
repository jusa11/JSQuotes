import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './redux/slices/userSlice';
import {
  selectQuery,
  selectResults,
  selectType,
  setQuery,
  setResult,
  setType,
} from './redux/slices/searchSlice';
import { fetchSearch } from './redux/slices/searchSlice';
import { useState } from 'react';

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
      <div className="content-main__card_big profile-card search-quote__container">
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
        <button className="form-reset">X</button>
      </div>

      {results.map((quote) => (
        <div
          className="quotes-action__last-quotes quotes-action__card card"
          key={quote._id}
        >
          {quote.text}
        </div>
      ))}
    </>
  );
};

export default SearchForm;
