import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SEARCH } from '../../../config';

const initialState = {
  query: '',
  type: 'all',
  results: [],
  status: 'idle',
  error: null,
};

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async ({ query, type, username }) => {
    try {
      const res = await axios.get(SEARCH, {
        params: { query, type, username },
      });

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setResult: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.status = 'success';
      state.results = action.payload;
    });
  },
});

export const { setQuery, setType, setResult } = searchSlice.actions;

export const selectQuery = (state) => state.search.query;
export const selectType = (state) => state.search.type;
export const selectResults = (state) => state.search.results;
export const selectStatus = (state) => state.search.status;
export const selectError = (state) => state.search.error;

export default searchSlice.reducer;
