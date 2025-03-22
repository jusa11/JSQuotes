const { default: axios } = require('axios');

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const res = await axios.post('http://localhost:5000/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Ошибка обновления токена', error);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return null;
  }
};
