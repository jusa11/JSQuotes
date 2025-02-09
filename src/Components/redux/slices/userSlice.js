import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.isAuth = true;
    },
    logout: (state) => {
      state.username = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
