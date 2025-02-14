import Burger from '../others/Burger';

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
            <a href="#space-planet" className="menu__link">
              Поймать
            </a>
          </li>
          <li className="menu__item">
            <a href="#quotes-action" className="menu__link">
              Поделиться
            </a>
          </li>
          <li className="menu__item">
            <a href="#popular" className="menu__link">
              Популярные
            </a>
          </li>
        </ul>
      </div>
      <Burger className="burger" />
    </>
  );
};

export default MainMenu;
