import qoutes from '../../data/qoutes';

let lastIndex = null;
const maxNum = qoutes.length;

function generateRandomQuote() {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * maxNum);
  } while (randomNum === lastIndex);

  lastIndex = randomNum;
  return qoutes[lastIndex];
}

export default generateRandomQuote;
