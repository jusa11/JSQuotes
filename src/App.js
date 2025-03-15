import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './Components/redux/slices/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './Components/others/Error';
import Header from './Components/blocks/header/Header';
import Stars from './Components/others/Stars';
import Space from './Components/blocks/space/Space';
import QuotesAction from './Components/blocks/quotes-action/QuotesAction';
import Popular from './Components/blocks/popular/Popular';
import Footer from './Components/blocks/footer/Footer';
import Profile from './Components/blocks/profile/Profile';
import FavoritePage from './Components/blocks/profile/FavoritePage';
import SharePage from './Components/blocks/profile/SharePage';
import SettingsPage from './Components/blocks/profile/SettingsPage';
import Layout from './Components/others/Layout';
import { RefProvider } from './Hooks/useOutletRef';
import ScrollToTopButton from './Components/others/ScrollToTopButton';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <RefProvider>
        <Router>
          <Stars />

          <Routes>
            <Route path="/profile" element={<Layout />}>
              <Route index element={<Profile />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="share" element={<SharePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route
              index
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
          <ScrollToTopButton />
          <Error />
        </Router>
      </RefProvider>
    </div>
  );
}

export default App;
