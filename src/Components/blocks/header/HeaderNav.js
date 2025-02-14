import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { selectUser } from '../../redux/slices/userSlice';
import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';
import AuthPopup from '../authorization/AuthPopup';

const HeaderNav = () => {
  const { isAuth } = useSelector(selectUser);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);

  return (
    <nav className="header__nav nav-menu">
      <Logo />
      <MainMenu />

      <div className="header-join">
        {isAuth ? (
          <>
            <Link to="/profile">
              <img
                alt="Сменить лого"
                src="../../../../src/img/profile-logo.png"
                className="navigation__item-icon profile-account"
                width={'40px'}
              />
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
