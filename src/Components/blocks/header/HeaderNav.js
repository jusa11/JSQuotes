import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { selectUser } from '../../redux/slices/userSlice';
import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';
import AuthPopup from '../authorization/AuthPopup';
import UserCard from '../../others/UserCard';
import Burger from '../../others/Burger';

const HeaderNav = () => {
  const { isAuth } = useSelector(selectUser);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  return (
    <nav className="header__nav nav-menu">
      <Logo />
      <div className="main-menu">
        <MainMenu />
      </div>
      <Burger />

      <div className="header-join">
        {isAuth ? (
          <>
            <Link to="/profile">
              <UserCard hidden={true} />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setAuthPopupOpen(true)}
              className="main__btn"
            >
              Присоединиться
            </button>
          </>
        )}

        <Popup
          open={isAuthPopupOpen}
          modal
          overlayStyle={{ background: 'rgba(0, 0, 0, 0.7)' }}
          onClose={() => setAuthPopupOpen(false)}
        >
          <AuthPopup
            isOpen={isAuthPopupOpen}
            onClose={() => setAuthPopupOpen(false)}
          />
        </Popup>
      </div>
    </nav>
  );
};

export default HeaderNav;
