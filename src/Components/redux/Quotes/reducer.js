import * as a from './actionTypes';

const initialState = [];

const qouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_QUOTE:
      return [...state, action.payload];
    case a.DELETE_QUOTE:
      return state.filter((quote) => quote.id !== action.payload);
    case a.DELETE_ALL_QUOTE:
      return [];
    default:
      return state;
  }
};

export default qouteReducer;
