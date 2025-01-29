import { useState } from 'react';
import MainMenu from '../MainMenu';
import Logo from '../Logo';
import Burger from '../Burger';

const HeaderNav = () => {
  const [isHeaderActive, setHeaderActive] = useState('');
  const [isMenuActive, setHeaderMenuActive] = useState('');

  const toogleHeaderActive = (type) => {
    setHeaderActive((prev) => !prev);
    setHeaderMenuActive((prev) => !prev);
    document.body.classList.toggle('lock');
  };

  return (
    <nav className="header__nav nav-menu">
      <Logo />
      <MainMenu className={'active'} isActive={isMenuActive} />
      <div className="header__btn">
        <a href="#join-us" className="header-menu__btn">
          Присоединиться
          <i className="fa-solid fa-angle-right header-menu__btn_icon"></i>
        </a>
      </div>
      <Burger
        isActive={isHeaderActive}
        className={'header__burger'}
        onClick={toogleHeaderActive}
      />
    </nav>
  );
};

export default HeaderNav;
