const MainMenu = ({ isActive }) => {
  return (
    <div className={`${isActive ? 'active' : ''} main-menu`}>
      <ul className="menu__list">
        <li className="menu__item">
          <a href="#generator" className="menu__link">
            Генератор
          </a>
        </li>
        <li className="menu__item">
          <a href="#planet" className="menu__link">
            Поймать
          </a>
        </li>
        <li className="menu__item">
          <a href="#share-quote" className="menu__link">
            Поделиться
          </a>
        </li>
        <li className="menu__item">
          <a href="#last-quotes" className="menu__link">
            Последние
          </a>
        </li>

        <li className="menu__item join-btn__mobile">
          <a href="#join-us" className="header-menu__btn">
            Присоединиться <i className="fa-solid fa-angle-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
