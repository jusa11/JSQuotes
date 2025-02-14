import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';

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
