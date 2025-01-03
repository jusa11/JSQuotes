import { configureStore } from '@reduxjs/toolkit';
// import qouteReducer from './Quotes/reducer';
import quotesReducer from './slices/quotesSlice';
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice';

export default configureStore({
  reducer: {
    quote: quotesReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});
