import Burger from './Burger';

const MainMenu = () => {
  return (
    <>
      <div className="main-menu">
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
        </ul>
      </div>
      <Burger className="burger" />
    </>
  );
};

export default MainMenu;
