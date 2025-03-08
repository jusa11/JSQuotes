import { Link } from 'react-scroll';

const MainMenu = ({ closeMenu }) => {
  return (
    <>
      <ul className="menu__list">
        <li className="menu__item">
          <Link
            to="generator"
            className="menu__link"
            smooth={true}
            duration={800}
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            Популярные
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MainMenu;
