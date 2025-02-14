import { MAX_TEXT_LENGTH } from '../config';

export const limitTextLength = (text) => {
  if (!text) return '';
  return text.length > MAX_TEXT_LENGTH
    ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
    : text;
};

