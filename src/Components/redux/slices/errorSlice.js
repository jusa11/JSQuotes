import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'Error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => initialState,
  },
});

export default errorSlice.reducer;


