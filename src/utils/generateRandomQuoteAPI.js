import axios from 'axios';

export const generateRandomQuoteAPI = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    'https://server-quotes-production-ebef.up.railway.app/quotes/random',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};
