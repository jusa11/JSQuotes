const userLevels = require('./userLevels');

const checkUserLevel = (countQuote) => {
  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (countQuote >= userLevels[i].amount) {
      const currentLevel = userLevels.indexOf(userLevels[i]);
      const nextLevelCount = userLevels[i + 1].amount;
     
      return {
        currentLevel,
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
