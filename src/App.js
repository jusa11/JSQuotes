// import QuoteBlock from './Components/QuoteBlock';
// import FavoriteQuotesCards from './Components/FavoriteQuotesCards';
// import Filter from './Components/Filter';
import Error from './Components/Error';
import Header from './Components/blocks/header/Header';
import Stars from './Components/Stars';
import Space from './Components/blocks/space/Space';
import QuotesAction from './Components/blocks/quotes-action/QuotesAction';
import Popular from './Components/blocks/popular/Popular';
import Footer from './Components/blocks/footer/Footer';
import Registration from './Components/blocks/authorization/Registration';
import Login from './Components/blocks/authorization/Login';
import './App.css';

function App() {
  return (
    <div className="app">
      <Stars />
      <Header />
      <Registration />
      <Login />
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
      <Error />
    </div>
  );
}

export default App;
