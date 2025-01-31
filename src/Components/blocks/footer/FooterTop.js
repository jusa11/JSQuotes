import MainMenu from '../MainMenu';
import Logo from '../Logo';

const FooterTop = () => {
  return (
    <div className="footer__top">
      <Logo />
      <MainMenu />
      <div className="join__btn">
        <a href="#join-us" className="main__btn">
          Присоединиться
        </a>
      </div>
    </div>
  );
};

export default FooterTop;
