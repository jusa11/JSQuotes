import axios from 'axios';

export const generateRandomQuoteAPI = async () => {
  const res = await axios.get('http://localhost:4000/random-quote');

  return res.data;
};
