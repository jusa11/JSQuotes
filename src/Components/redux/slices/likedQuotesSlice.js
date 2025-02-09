import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const likedQuotesSlice = createSlice({
  name: 'likedQuotes',
  initialState,
  reducers: {
    setLikedQuotes: (state, action) => action.payload,
    toggleLike: (state, action) => {
      const index = state.findIndex(
        (quote) => quote._id === action.payload._id
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { setLikedQuotes, toggleLike } = likedQuotesSlice.actions;
export const selectLikedQuotes = (state) => state.likedQuotes;
export default likedQuotesSlice.reducer;
