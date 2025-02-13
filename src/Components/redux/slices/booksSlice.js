import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithID';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejecWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAddBook: (state, action) => {
      state.books.push(action.payload);
    },
    setDeleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
      // state.filter((book) => book.id !== action.payload);
    },
    setToggleFavoriteBook: (state, action) => {
      /* return state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      ); */
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  /* extraReducers: {
    [fetchBook.pending]: (state, action) => {
      state.isLoadingAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    },
  }, */
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });

    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });

    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
});

export const { setAddBook, setDeleteBook, setToggleFavoriteBook } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectisLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;
