import { useSelector } from 'react-redux';
import SearchForm from './SearchForm';
import { setChoosedSearch } from '../redux/slices/searchSlice';
import { useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { selectUser } from '../redux/slices/userSlice';

const SearchOverlay = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectUser);

  console.log('overlay');
  return (
    <div className="search-overlay">
      <div className="search-overlay__handler">
        <button
          className="search-overlay__close"
          onClick={() => dispatch(setChoosedSearch(false))}
        >
          <RxCross2 />
        </button>
      </div>
      <div className="search-overlay__container">
        <div className="search-overlay__content">
          <SearchForm isAuth={isAuth} />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
