import { useState } from 'react';
import MainMenu from '../MainMenu';
import Logo from '../Logo';
import Burger from '../Burger';

const FooterTop = () => {
  const [isFooterActive, setFooterActive] = useState('');
  const [isMenuActive, setFooterMenuActive] = useState('');

  const toogleFooterActive = (type) => {
    setFooterActive((prev) => !prev);
    setFooterMenuActive((prev) => !prev);
    document.body.classList.toggle('lock');
  };

  return (
    <div className="footer__top">
      <Logo />
      <MainMenu className={'active'} isActive={isMenuActive} />
      <Burger
        isActive={isFooterActive}
        className={'footer__burger'}
        onClick={toogleFooterActive}
      />
    </div>
  );
};

export default FooterTop;
