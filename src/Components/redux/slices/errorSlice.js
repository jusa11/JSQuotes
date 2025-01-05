import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => initialState,
  },
});

export default errorSlice.reducer;

export const { setError, clearError } = errorSlice.actions;

export const selectErrorMessage = (state) => state.error;
