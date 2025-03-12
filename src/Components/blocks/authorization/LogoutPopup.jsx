import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

const LogoutPopup = ({ isPopup, setPopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Popup
      open={isPopup}
      modal
      overlayStyle={{
        backdropFilter: 'blur(10px)',
      }}
      onClose={() => setPopup(false)}
    >
      <div className="main-popup">
        <h2 className="loguot-title">Ну, все, погнал?</h2>
        <div className="loguot-buttons">
				<button className='popup-btn_active' onClick={() => setPopup(false)}>Остаться</button>
          <button
            className="popup-btn"
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
          >
            Выйти
          </button>
          
        </div>
      </div>
    </Popup>
  );
};

export default LogoutPopup;
