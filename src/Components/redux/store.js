import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from './slices/quotesSlice';
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice';
import displayQuotesSlice from './slices/displayQuotesSlice';
import useReducer from './slices/userSlice';
import likedQuotesSlice from './slices/likedQuotesSlice';

export default configureStore({
  reducer: {
    quote: quotesReducer,
    filter: filterReducer,
    error: errorReducer,
    displayQuotes: displayQuotesSlice,
    user: useReducer,
    likedQuotes: likedQuotesSlice,
  },
});
