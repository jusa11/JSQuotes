const Quote = require('../models/Quote');
const User = require('../models/User');
const checkUserLevel = require('../utils/checkUserLevel');
const userLevels = require('../utils/userLevels');

// Левел пользователя
exports.getUserLevel = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const currentCountQuotes = user.countQuote; // всего циатат у пользователя
    let currentLevel;
    let nextLevelCount;
    let titleLevel;
    let needQuoteForNextLevel;
    let needQuoteForCurrnetLevel;

    if (currentCountQuotes >= userLevels[userLevels.length - 1].amount) {
      currentLevel = userLevels.length - 1;
      titleLevel = userLevels[userLevels.length - 1].title;
      nextLevelCount = null;
      needQuoteForNextLevel = 0;
      needQuoteForCurrnetLevel = 0;
    } else {
      const levels = checkUserLevel(currentCountQuotes);
      currentLevel = levels.currentLevel; // текущий левел пользователя
      nextLevelCount = levels.nextLevelCount; // сколько всего цитат нужно для след. левела
      titleLevel = levels.titleLevel;
      needQuoteForNextLevel = nextLevelCount - currentCountQuotes; // сколько осталось цитат до след. левела
      needQuoteForCurrnetLevel =
        userLevels[currentLevel + 1].amount - userLevels[currentLevel].amount; // сколько цитат на текущем левеле нужно добавить
    }

    if (!needQuoteForNextLevel) {
      needQuoteForNextLevel = 0;
    }

    res.json({
      currentLevel,
      nextLevelCount,
      currentCountQuotes,
      needQuoteForNextLevel,
      needQuoteForCurrnetLevel,
      titleLevel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// лайк
exports.toggleLike = async (req, res) => {
  try {
    const { quoteId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: 'Цитата не найдена' });
    }

    const isLiked = user.likedQuotes.includes(quoteId);
    if (isLiked) {
      user.likedQuotes = user.likedQuotes.filter(
        (id) => id.toString() !== quoteId.toString()
      );
      quote.likes -= 1;
    } else {
      user.likedQuotes.unshift(quoteId);
      quote.likes += 1;
    }
    await user.save();
    await quote.save();

    res.json({ succes: true, liked: !isLiked, quantity: quote.likes });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
    console.error(error);
  }
};
