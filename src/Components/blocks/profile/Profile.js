import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import ListQuotes from '../../others/ListQuote';
import SearchForm from '../../others/SearchForm';
import StatsProfile from './StatsProfile';
import { logout, selectUser } from '../../redux/slices/userSlice';
import {
  POPULAR_URL,
  LAST_QUOTES_URL,
  QUOTES_URL,
  LIKED_QUOTES,
} from '../../../config';

const Profile = () => {
  const { username } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <main className="profile">
      <div className="profile-wrapper">
        <aside className="profile-sidebar">
          <nav className="profile-sidebar__navigation">
            <ul className="sidebar-navigation__list">
              <li className="sidebar-navigation__account">
                <img
                  alt="Сменить лого"
                  src="../../../../src/img/profile-logo.png"
                  className="navigation__item-icon profile-account"
                />
              </li>
              <li className="sidebar-navigation__item">
                <IoMdHome
                  className="navigation__item-icon"
                  onClick={() => navigate('/')}
                />
              </li>
              <li className="sidebar-navigation__item">
                <MdFavorite className="navigation__item-icon" />
              </li>
              <li className="sidebar-navigation__item">
                <FiShare className="navigation__item-icon" />
              </li>
              <li className="sidebar-navigation__item">
                <IoMdSettings className="navigation__item-icon" />
              </li>
              <li className="sidebar-navigation__item">
                <ImSwitch
                  className="navigation__item-icon"
                  onClick={() => {
                    dispatch(logout());
                    navigate('/');
                  }}
                />
              </li>
            </ul>
          </nav>
        </aside>
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
        <section className="profile-rigth">
          <StatsProfile />

          <div className="content-right__card profile-card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem
            impedit perferendis nobis possimus culpa beatae facere ut quae
            perspiciatis accusantium, quaerat laboriosam distinctio non iste
            doloribus a. Quaerat repellendus possimus harum, nam eos quos
            similique delectus perspiciatis deserunt nostrum fugit officiis hic
            ipsum quisquam!
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
