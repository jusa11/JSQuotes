import QuoteBlock from './Components/QuoteBlock';
import FavoriteQuotesCards from './Components/FavoriteQuotesCards';
import Filter from './Components/Filter';
import Error from './Components/Error';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <div className="content">
          <section className="quotes">
            <div className="container">
              <div className="quotes-title">
                <h1 className="quotes-title-title">Цитаты Джейсона Стэтхэма</h1>
              </div>
              <QuoteBlock />
              <Filter />
              <FavoriteQuotesCards className="favorites-qoutes" />
            </div>
          </section>
        </div>
      </div>
      <Error />
    </div>
  );
}

export default App;
