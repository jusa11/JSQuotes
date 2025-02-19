import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from './slices/quotesSlice';
import errorReducer from './slices/errorSlice';
import displayQuotesSlice from './slices/displayQuotesSlice';
import useReducer from './slices/userSlice';
import likedQuotesSlice from './slices/likedQuotesSlice';
import searchSlice from './slices/searchSlice';
import statsBarSlice from './slices/statsBarSlice';

export default configureStore({
  reducer: {
    quote: quotesReducer,
    error: errorReducer,
    displayQuotes: displayQuotesSlice,
    user: useReducer,
    likedQuotes: likedQuotesSlice,
    search: searchSlice,
    statsBar: statsBarSlice,
  },
});
