import MainMenu from '../MainMenu';
import Logo from '../Logo';

const HeaderNav = () => {
  return (
    <nav className="header__nav nav-menu">
      <Logo />
      <MainMenu />
      <div className="join__btn">
        <a href="#join-us" className="main__btn">
          Присоединиться
        </a>
      </div>
    </nav>
  );
};

export default HeaderNav;
