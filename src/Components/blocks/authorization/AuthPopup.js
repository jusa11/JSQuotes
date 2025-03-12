import { useState } from 'react';
import Popup from 'reactjs-popup';
import Registration from './Registration';
import Login from './Login';

const AuthPopup = ({ isPopup, setPopup }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Popup
        open={isPopup}
        modal
        overlayStyle={{
          // background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
        onClose={() => setPopup(false)}
      >
        <div className="main-popup">
          {isLogin ? (
            <>
              <Login
                onSwitch={() => setIsLogin(false)}
                onClose={() => setPopup(false)}
              />
            </>
          ) : (
            <>
              <Registration onSwitch={() => setIsLogin(true)} />
            </>
          )}
        </div>
      </Popup>
    </>
  );
};

export default AuthPopup;
