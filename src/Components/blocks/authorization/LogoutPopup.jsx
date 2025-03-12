import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutPopup = ({ isPopup, setPopup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Popup
      open={isPopup}
      modal
      closeOnDocumentClick
      onClose={() => setPopup(false)}
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.7)' }}
      contentStyle={{
        background: '#111',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        textAlign: 'center',
        width: '300px',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
      }}
    >
      <FaSignOutAlt size={40} color="#f00" style={{ marginBottom: '10px' }} />
      <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>
        Вы точно хотите выйти?
      </h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
          style={{
            background: '#f00',
            color: '#fff',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
            marginRight: '10px',
          }}
        >
          Выйти
        </button>
        <button
          onClick={() => setPopup(false)}
          style={{
            background: 'transparent',
            color: '#fff',
            padding: '10px 15px',
            border: '1px solid #fff',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          Остаться
        </button>
      </div>
    </Popup>
  );
};

export default LogoutPopup;
