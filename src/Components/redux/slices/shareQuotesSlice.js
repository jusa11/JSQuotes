import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const shareQuotesSlice = createSlice({
  name: 'shareQuotes',
  initialState,
  reducers: {
    setAddShareQuotes: (state, action) => {
      state.unshift(action.payload);
    },
    resetForm: () => initialState,
  },
});

export const { setAddShareQuotes, resetForm } = shareQuotesSlice.actions;

export const selectShareQuote = (state) => state.shareQuotes;

export default shareQuotesSlice.reducer;
