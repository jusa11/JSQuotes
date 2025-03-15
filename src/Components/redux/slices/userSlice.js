import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  username: null,
  userId: null,
  isAuth: false,
  logo: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.logo = action.payload.logo;
      state.isAuth = true;
    },
    logout: (state) => {
      state.username = null;
      state.userId = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decode = jwtDecode(token);
          state.username = decode.username;
          state.userId = decode._id;
          state.logo = decode.logo;
          state.isAuth = true;
        } catch (error) {
          console.error(error);
          localStorage.removeItem('token');
        }
      }
    },
  },
});

export const { setUser, logout, checkAuth } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
