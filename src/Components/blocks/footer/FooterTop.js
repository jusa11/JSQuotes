import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserCard from '../../others/UserCard';
import Popup from 'reactjs-popup';
import { selectUser } from '../../redux/slices/userSlice';
import AuthPopup from '../authorization/AuthPopup';
import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';
import Burger from '../../others/Burger';

const FooterTop = () => {
  const { isAuth } = useSelector(selectUser);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  return (
    <div className="footer__top">
      <Logo />
      <div className="main-menu">
        <MainMenu />
      </div>
      <Burger />

      <div className="join__btn">
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
    </div>
  );
};

export default FooterTop;
