import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  author: '',
  onlyFavorites: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTextFilter: (state, action) => {
      state.text = action.payload;
    },
		setAuthorFilter: (state, action) => {
			state.author= action.payload
		},
    resetFilter: () => initialState,
  },
});

export const { setTextFilter,setAuthorFilter, resetFilter } = filterSlice.actions;

export const selectTextFilter = (state) => state.filter.text;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
