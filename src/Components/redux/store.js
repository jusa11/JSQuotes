import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from './slices/quotesSlice';
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice';
import shareQuotesSlice from './slices/shareQuotesSlice';

export default configureStore({
  reducer: {
    quote: quotesReducer,
    filter: filterReducer,
    error: errorReducer,
    shareQuotes: shareQuotesSlice,
  },
});
