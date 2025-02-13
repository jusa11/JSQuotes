	import { createSlice } from '@reduxjs/toolkit';

	const initialState = [];

	const likedQuotesSlice = createSlice({
		name: 'likedQuotes',
		initialState,
		reducers: {
			setLikedQuotes: (state, action) => action.payload,
			toggleLike: (state, action) => {
				const { _id, likes } = action.payload;
				const index = state.findIndex((quote) => quote._id === _id);
				if (index === -1) {
					state.push(...state, { _id, likes });
				
				} else {
					
					return state.map((quote) =>
						quote._id === _id ? { ...quote, likes } : quote
					);
				}
			},
		},
	});

	export const { setLikedQuotes, toggleLike } = likedQuotesSlice.actions;
	export const selectLikedQuotes = (state) => state.likedQuotes;
	export default likedQuotesSlice.reducer;
