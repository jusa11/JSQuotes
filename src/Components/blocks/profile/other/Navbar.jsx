
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { IoIosStats } from 'react-icons/io';
import { logout } from '../../../redux/slices/userSlice';
import {
  setStatBar,
  selectStatsStatus,
} from '../../../redux/slices/statsBarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statsBarStatus = useSelector(selectStatsStatus);

  return (
    <aside className="profile-navbar">
      <nav className="profile-navbar__navigation">
        <ul className="navbar-navigation__list">
          <li className="navbar-navigation__item">
            <IoMdHome
              className="navigation__item-icon"
              onClick={() => navigate('/')}
            />
          </li>
          <li className="navbar-navigation__item">
            <MdFavorite className="navigation__item-icon" />
          </li>
          <li className="navbar-navigation__item">
            <FiShare className="navigation__item-icon" />
          </li>
          <li className="navbar-navigation__item">
            <IoMdSettings className="navigation__item-icon" />
          </li>

          <li className="navbar-navigation__item navbar-stats">
            <IoIosStats
              className="navigation__item-icon navigation__item-stats"
              onClick={() =>
                dispatch(
                  setStatBar(
                    statsBarStatus === 'stats-active' ? '' : 'stats-active'
                  )
                )
              }
            />
          </li>
          <li className="navbar-navigation__item">
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
  );
};

export default Sidebar;
