import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { logout } from '../../redux/slices/userSlice';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('mainPage');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuItem = (e) => {
    const value = e.currentTarget.dataset.value;
    setActivePage(value);
  };

  return (
    <aside className="profile-sidebar">
      <nav className="profile-sidebar__navigation">
        <ul className="sidebar-navigation__list">
          <li
            className={`sidebar-navigation__item ${
              activePage === 'mainPage' ? 'active-page' : ''
            }`}
            data-value="mainPage"
            onClick={(e) => {
              handleMenuItem(e);
              navigate('/');
            }}
          >
            <IoMdHome className="navigation__item-icon" />
          </li>
          <li
            className={`sidebar-navigation__item ${
              activePage === 'favoritePage' ? 'active-page' : ''
            }`}
            data-value="favoritePage"
            onClick={(e) => {
              handleMenuItem(e);
              navigate('/favorite-page');
            }}
          >
            <MdFavorite className="navigation__item-icon" />
          </li>
          <li
            className={`sidebar-navigation__item ${
              activePage === 'sharePage' ? 'active-page' : ''
            }`}
            data-value="sharePage"
            onClick={handleMenuItem}
          >
            <FiShare className="navigation__item-icon" />
          </li>
          <li
            className={`sidebar-navigation__item ${
              activePage === 'settingPage' ? 'active-page' : ''
            }`}
            data-value="settingPage"
            onClick={handleMenuItem}
          >
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
  );
};

export default Sidebar;
