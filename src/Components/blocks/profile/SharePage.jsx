import { useSelector } from 'react-redux';
import ListQuotes from '../../others/ListQuote';
import SearchForm from '../../others/SearchForm';
import { selectUser } from '../../redux/slices/userSlice';
import { QUOTES_URL } from '../../../config';

const SharePage = () => {
  const { username } = useSelector(selectUser);

  return (
    <>
      <div className="profile-content__secondary">
        <SearchForm />

        <ListQuotes
          url={QUOTES_URL.replace(':username', username)}
          title={'Я поделился'}
        />
      </div>
    </>
  );
};

export default SharePage;
