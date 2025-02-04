import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastQuotes: [],
};

const shareQuotesSlice = createSlice({
  name: 'shareQuotes',
  initialState,
  reducers: {
    setLastQuotes: (state, action) => {
      state.lastQuotes = action.payload;
    },
    setAddQuotes: (state, action) => {
      state.lastQuotes = [action.payload, ...state.lastQuotes];
    },
  },
});

export const { setAddQuotes, setLastQuotes } = shareQuotesSlice.actions;

export const selectShareQuote = (state) => state.shareQuotes.lastQuotes;

export default shareQuotesSlice.reducer;
