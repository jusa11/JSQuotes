import axios from 'axios';
import checkQuoteWithID from './checkQuoteWithID';

export const generateRandomQuoteAPI = async (quotes) => {
  const res = await axios.get('http://localhost:4000/random-quote');
  if (res?.data?.text && res?.data?.author) {
    return checkQuoteWithID(quotes, res.data);
  }
};
