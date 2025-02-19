import { useSelector } from 'react-redux';
import ListQuotes from '../../others/ListQuote';
import SearchForm from '../../others/SearchForm';
import { selectUser } from '../../redux/slices/userSlice';
import { selectStatsStatus } from '../../redux/slices/statsBarSlice.js';
import {
  POPULAR_URL,
  LAST_QUOTES_URL,
  QUOTES_URL,
  LIKED_QUOTES,
} from '../../../config';
import PersonBlock from './PersonBlock';
import Stepper from './Stepper';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsProfile from './StatsProfile.jsx';

const FavoritePage = () => {
  const { username } = useSelector(selectUser);
  const statsBarStatus = useSelector(selectStatsStatus);

  return (
    <main className="profile">
      <div className="profile-container">
        <PersonBlock />
        <div className="profile-wrapper">
          <Sidebar />
          <section className="profile-content">
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
          </section>
          <section
            className={`profile-rigth ${statsBarStatus ? 'stats-active' : ''}`}
          >
            <StatsProfile />

            <Stepper />
          </section>
        </div>
      </div>

      <Navbar />
    </main>
  );
};

export default FavoritePage;
