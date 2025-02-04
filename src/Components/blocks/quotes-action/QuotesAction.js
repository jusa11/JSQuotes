import ShareForm from './ShareForm';
import LastListQuotes from './LastListQuotes';

const QuotesAction = () => {
  return (
    <section id="quotes-action">
      <div className="container">
        <div className="quotes-action__row">
          <div className="quotes-action__column">
            <ShareForm />
            <LastListQuotes />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesAction;
