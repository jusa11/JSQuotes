// import QuoteBlock from './Components/QuoteBlock';
// import FavoriteQuotesCards from './Components/FavoriteQuotesCards';
// import Filter from './Components/Filter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './Components/redux/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './Components/Error';
import Header from './Components/blocks/header/Header';
import Stars from './Components/Stars';
import Space from './Components/blocks/space/Space';
import QuotesAction from './Components/blocks/quotes-action/QuotesAction';
import Popular from './Components/blocks/popular/Popular';
import Footer from './Components/blocks/footer/Footer';
import Profile from './Components/blocks/profile/Profile';
import './App.css';
import { setError } from './Components/redux/slices/errorSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decode = jwtDecode(token);
        dispatch(setUser({ username: decode.username }));
      } catch (error) {
        setError('Ошибка декодирования токена');
        console.log(error);
      }
    }
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        <Stars />

        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="wrapper">
                  <div className="content">
                    <Space />
                    <QuotesAction />
                    <div className="swiper-container">
                      <Popular />
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>

        <Error />
      </Router>
    </div>
  );
}

export default App;
