import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import { slide as Menu } from 'react-burger-menu';
import { selectUser } from '../redux/slices/userSlice';
import AuthPopup from '../blocks/authorization/AuthPopup';
import MainMenu from './MainMenu';

const Burger = () => {
  const { isAuth } = useSelector(selectUser);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (isMenuOpen && !event.target.closest('bm-menu-wrap')) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, [isMenuOpen]);

  return (
    <>
      <Menu
        right
        noOverlay
        isOpen={isMenuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      >
       
          {isAuth ? (
            <>
              <Link to="/profile" onClick={closeMenu}>
                <UserCard closeMenu={closeMenu} menuOpen={isMenuOpen} />
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthPopupOpen(true);
                  closeMenu();
                }}
                className="burger-btn"
              >
                Присоединиться
              </button>
            </>
          )}
        
        <MainMenu closeMenu={closeMenu} />
      </Menu>
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
    </>
  );
};

export default Burger;
