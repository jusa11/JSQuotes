const userLevels = require('./userLevels');

const checkUserLevel = (countQuote) => {
  let currentLevel;
  let titleLevel;
  let nextLevelCount;

  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (countQuote >= userLevels[i].amount) {
      currentLevel = userLevels.indexOf(userLevels[i]);
      titleLevel = userLevels[currentLevel].title;
      nextLevelCount = userLevels[i + 1].amount;

      return {
        currentLevel,
        titleLevel,
        nextLevelCount,
      };
    }
  }
  return {
    currentLevel: 0,
    nextLevelCount: userLevels[1].amount,
  };
};

module.exports = checkUserLevel;
