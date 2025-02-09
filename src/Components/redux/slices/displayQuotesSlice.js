import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastQuotes: [],
  popularQuotes: [],
  userQuotes: [],
};

const displayQuotesSlice = createSlice({
  name: 'displayQuotes',
  initialState,
  reducers: {
    setLastQuotes: (state, action) => {
      state.lastQuotes = action.payload;
    },
    setQuotesUser: (state, action) => {
      state.userQuotes = action.payload;
    },
    setPopularQuotes: (state, action) => {
      state.popularQuotes = action.payload;
    },
    setAddQuotes: (state, action) => {
      state.lastQuotes = [action.payload, ...state.lastQuotes];
    },
  },
});

export const { setAddQuotes, setLastQuotes, setPopularQuotes, setQuotesUser } =
  displayQuotesSlice.actions;

export const selectDisplayLastQuotes = (state) =>
  state.displayQuotes.lastQuotes;
export const selectDisplayPopularQuotes = (state) =>
  state.displayQuotes.popularQuotes;
export const selectDisplayUserQuotes = (state) =>
  state.displayQuotes.userQuotes;
export default displayQuotesSlice.reducer;
