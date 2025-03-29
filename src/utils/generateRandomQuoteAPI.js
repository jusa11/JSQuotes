import axios from 'axios';

export const generateRandomQuoteAPI = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:5000/quotes/random', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
