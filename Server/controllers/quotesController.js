const Quote = require('../models/Quote');
const User = require('../models/User');
const randomQuote = require('../utils/randomQuote');
const checkUserLevel = require('../utils/checkUserLevel');

// Генерация цитаты
exports.getRandomQuote = async (req, res) => {
  try {
    const quotes = await Quote.find().populate({
      path: 'userId',
      select: 'username level logo',
    });

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' });
    }
    const quote = randomQuote(quotes);

    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Последние цитаты
exports.getLastQuotes = async (req, res) => {
  try {
    const lastQuotes = await Quote.find().sort({ date: -1 }).limit(4).populate({
      path: 'userId',
      select: 'username level logo',
    });

    if (!lastQuotes || lastQuotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' }); // Если нет цитат, возвращаем ошибку
    }
    res.json(lastQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// добавить цитату
exports.addQuote = async (req, res) => {
  const { text, author, userId } = req.body;

  if (!text || !author || !userId) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    user.countQuote += 1;
    const levels = checkUserLevel(user.countQuote); // Считаем новый уровень
    user.level = levels.currentLevel; // Обновляем уровень в БД

    await user.save();

    const newQuote = new Quote({
      text,
      author: user.username,
      userId,
      date: new Date().toISOString(),
    });
    await newQuote.save();

    res.json({ newQuote, logo: user.logo }); // отправлять не только цитату а и username, кол-во цитат и level
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Цитаты пользователя
exports.getUserQuotes = async (req, res) => {
  try {
    const { username } = req.params;

    const userQuotes = await Quote.find({ author: username })
      .sort({
        date: -1,
      })
      .populate({
        path: 'userId',
        select: 'username level logo',
      });
    if (!userQuotes || userQuotes.length === 0) {
      return res.status(200).json(userQuotes);
    }
    res.json(userQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Понравившиеся цитаты
exports.getLikedQuotes = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate({
      path: 'likedQuotes',
      populate: {
        path: 'userId',
        select: 'username level logo',
      },
    });

    if (!user) {
      return res.json({ message: 'Пользователь не найден' });
    }

    // Берём только последние 4 лайка в порядке добавления
    const lastLikedQuotes = user.likedQuotes.slice(0, 4);
    res.json(lastLikedQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Популярные цитаты
exports.getPopularQuotes = async (req, res) => {
  try {
    const popularQuotes = await Quote.find()
      .sort({ likes: -1 })
      .limit(10)
      .populate({
        path: 'userId',
        select: 'username logo level',
      });
    res.json(popularQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// все цитаты
exports.getAllQuotes = async (req, res) => {
  try {
    const lastQuotes = await Quote.find();

    if (!lastQuotes || lastQuotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' }); // Если нет цитат, возвращаем ошибку
    }
    res.json(lastQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Поиск
exports.searchQuotes = async (req, res) => {
  try {
    const { query, type, username, page = 1 } = req.query;
    const limit = 2;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ error: 'Введите поисковый запрос' });
    }
    let filter = {};

    if (type === 'all') {
      filter = { text: { $regex: query, $options: 'i' } };
    }

    if (type === 'user' && username) {
      filter = { author: username, text: { $regex: query, $options: 'i' } };
    }

    if (type === 'liked' && username) {
      const user = await User.findOne({ username }).populate('likedQuotes');
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      filter = {
        _id: { $in: user.likedQuotes },
        text: { $regex: query, $options: 'i' },
      };
    }

    const quotes = await Quote.find(filter).skip(skip).limit(limit).populate({
      path: 'userId',
      select: 'username level logo', // Забираем username и level из User
    });

    const totalQuotes = await Quote.countDocuments(filter);
    const hasMore = totalQuotes > skip + limit;

    res.json({ quotes, hasMore });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
