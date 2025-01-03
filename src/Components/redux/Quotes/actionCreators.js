import * as a from './actionTypes';

export const addQuote = (qoute) => {
  return {
    type: a.ADD_QUOTE,
    payload: qoute,
  };
};

export const deleteQuote = (id) => {
  return {
    type: a.DELETE_QUOTE,
    payload: id,
  };
};

export const deleteAllQuote = () => {
  return {
    type: a.DELETE_ALL_QUOTE,
  };
};
