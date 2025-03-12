import { NavLink } from 'react-router-dom';
import LogoutPopup from '../../authorization/LogoutPopup';
import { IoMdHome } from 'react-icons/io';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { useState } from 'react';

const Sidebar = () => {
  const [isPopup, setPopup] = useState();

  return (
    <>
      <aside className="profile-sidebar">
        <nav className="profile-sidebar__navigation">
          <ul className="sidebar-navigation__list">
            <li className="sidebar-navigation__item">
              <NavLink to="/profile" end>
                <IoMdHome className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/favorite">
                <MdFavorite className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/share">
                <FiShare className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/settings">
                <IoMdSettings className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <ImSwitch
                className="navigation__item-icon"
                onClick={() => {
                  setPopup(true);
                }}
              />
            </li>
          </ul>
        </nav>
      </aside>
      <LogoutPopup isPopup={isPopup} setPopup={setPopup} />
    </>
  );
};

export default Sidebar;
