import axios from 'axios';

export const generateRandomQuoteAPI = async () => {
  const res = await axios.get('http://localhost:5000/quotes/random');

  return res.data;
};
