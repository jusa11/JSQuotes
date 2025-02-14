import { slide as Menu } from 'react-burger-menu';

const Burger = () => {
  return (
    <Menu right noOverlay>
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
          <a href="#join-us" className="main__btn">
            Присоединиться
          </a>
        </li>
      </ul>
    </Menu>
  );
};

export default Burger;
