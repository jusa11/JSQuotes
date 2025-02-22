import { IoIosNotifications } from 'react-icons/io';
import Logo from '../../../others/Logo';

const PersonBlock = () => {
  return (
    <div className="person-block">
      <div className="person-block__left">
        <Logo />
      </div>
      <div className="person-block__right">
        <div className="person-block__notifications">
          <IoIosNotifications />
        </div>
        <div className="person-block__person">
          <div className="person-block__logo">
            <img src="/src/img/profile-logo.png" alt="'username" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonBlock;
