import { useState } from 'react';
import Registration from './Registration';
import Login from './Login';

const AuthPopup = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-popup-content">
      {isLogin ? (
        <>
          <Login onSwitch={() => setIsLogin(false)} onClose={onClose} />
        </>
      ) : (
        <>
          <Registration onSwitch={() => setIsLogin(true)} onClose={onClose} />
        </>
      )}
    </div>
  );
};

export default AuthPopup;
