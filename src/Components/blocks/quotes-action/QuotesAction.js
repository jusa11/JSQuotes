import ShareForm from './ShareForm';
import ListQuotes from '../../others/ListQuote';
import { LAST_QUOTES_URL } from '../../../config';

const QuotesAction = () => {
  return (
    <section id="quotes-action">
      <div className="container">
        <div className="quotes-action__row">
          <div className="quotes-action__column">
            <ShareForm />
            <ListQuotes
              url={LAST_QUOTES_URL}
              title={'Последние мысли Джейсона Стетхема'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesAction;
