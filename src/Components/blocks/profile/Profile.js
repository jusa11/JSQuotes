import { useSelector } from 'react-redux';
import ListQuotes from '../../others/ListQuote';
import SearchForm from '../../others/SearchForm';
import { selectUser } from '../../redux/slices/userSlice';
import {
  POPULAR_URL,
  LAST_QUOTES_URL,
  QUOTES_URL,
  LIKED_QUOTES,
} from '../../../config';

const Profile = () => {
  const { username } = useSelector(selectUser);

  return (
    <>
      <div className="profile-content__main">
        <ListQuotes
          url={QUOTES_URL.replace(':username', username)}
          title={'Я поделился'}
        />
        <ListQuotes
          url={LIKED_QUOTES.replace(':username', username)}
          title={'Понравившиеся цитаты'}
        />

        <SearchForm />
      </div>
      <div className="profile-content__bottom">
        <ListQuotes
          url={LAST_QUOTES_URL}
          title={'Последние мысли Джейсона Стетхема'}
        />
        <ListQuotes url={POPULAR_URL} title={'Популярные мысли'} />
      </div>
    </>
  );
};

export default Profile;
