import Burger from '../others/Burger';
import { Link } from 'react-scroll';

const MainMenu = () => {
  return (
    <>
      <div className="main-menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link
              to="generator"
              className="menu__link"
              smooth={true}
              duration={800}
            >
              Генератор
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="space-planet"
              className="menu__link"
              smooth={true}
              duration={800}
            >
              Поймать
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="quotes-action"
              className="menu__link"
              smooth={true}
              duration={800}
            >
              Поделиться
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="popular"
              className="menu__link"
              smooth={true}
              duration={800}
            >
              Популярные
            </Link>
          </li>
        </ul>
      </div>
      <Burger className="burger" />
    </>
  );
};

export default MainMenu;
