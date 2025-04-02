const Quote = require('../models/Quote');
const User = require('../models/User');
const randomQuote = require('../utils/randomQuote');
const checkUserLevel = require('../utils/checkUserLevel');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Генерация цитаты
exports.getRandomQuote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        userId = decoded._id;
      } catch (error) {
        console.error('Пользователь не авторизован');
      }
    }

    const quotes = await Quote.find()
      .populate({
        path: 'userId',
        select: 'username level logo',
      })
      .lean();

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' });
    }
    const quote = randomQuote(quotes);

    if (!quote) {
      return res.status(404).json({ msg: 'No quote found' });
    }
    const user = await User.findById(userId);

    if (userId) {
      // Получаем только ID лайкнутых цитат пользователем
      const likedQuotes = await Quote.find({ likeBy: userId })
        .select('_id')
        .lean();

      // Создаём Set для быстрого поиска
      const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

      quote.isLiked = likedSet.has(quote._id.toString());
    }

    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Последние цитаты
exports.getLastQuotes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        userId = decoded._id;
      } catch (error) {
        console.error('Пользователь не авторизован');
      }
    }

    const lastQuotes = await Quote.find()
      .sort({ date: -1 })
      .limit(10)
      .select('author date isLiked likes text userId')
      .populate({
        path: 'userId',
        select: 'username level logo',
      })
      .lean(); // Преобразуем в обычные объекты для удобства работы

    if (!lastQuotes.length) {
      return res.status(404).json({ msg: 'No quotes found' });
    }

    if (userId) {
      // Получаем только ID лайкнутых цитат пользователем
      const likedQuotes = await Quote.find({ likeBy: userId })
        .select('_id')
        .lean();

      // Создаём Set для быстрого поиска
      const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

      // Добавляем isLiked в каждую цитату
      lastQuotes.forEach((q) => {
        q.isLiked = likedSet.has(q._id.toString());
      });
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

    // Находим цитаты пользователя
    const userQuotes = await Quote.find({ author: username })
      .sort({ date: -1 })
      .limit(3)
      .populate({
        path: 'userId',
        select: 'username level logo',
      })
      .lean(); // Преобразуем в обычные объекты

    if (!userQuotes.length) {
      return res.status(200).json(userQuotes);
    }

    // Ищем пользователя и его ID
    const user = await User.findOne({ username: username })
      .select('_id')
      .lean();
    if (!user) {
      return res.json(userQuotes);
    }

    const userId = user._id;

    // Получаем ID лайкнутых цитат пользователем
    const likedQuotes = await Quote.find({ likeBy: userId })
      .select('_id')
      .lean();

    // Создаём Set для быстрого поиска
    const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

    // Добавляем isLiked в каждую цитату
    userQuotes.forEach((q) => {
      q.isLiked = likedSet.has(q._id.toString());
    });

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

    const user = await User.findOne({ username })
      .populate({
        path: 'likedQuotes',
        populate: {
          path: 'userId',
          select: 'username level logo',
        },
      })
      .lean();

    if (!user) {
      return res.json({ message: 'Пользователь не найден' });
    }

    // Берём только последние 4 лайка в порядке добавления
    const lastLikedQuotes = user.likedQuotes.slice(0, 4);

    // Ищем пользователя и его ID

    const userId = user._id;

    // Получаем ID лайкнутых цитат пользователем
    const likedQuotes = await Quote.find({ likeBy: userId })
      .select('_id')
      .lean();

    // Создаём Set для быстрого поиска
    const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

    // Добавляем isLiked в каждую цитату
    lastLikedQuotes.forEach((q) => {
      q.isLiked = likedSet.has(q._id.toString());
    });

    res.json(lastLikedQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPopularQuotes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        userId = decoded._id;
      } catch (error) {
        console.error('Пользователь не авторизован');
      }
    }

    const popularQuotes = await Quote.find()
      .sort({ likes: -1 })
      .limit(10)
      .populate({
        path: 'userId',
        select: 'username logo level',
      })
      .lean();

    if (!popularQuotes.length) {
      return res.status(404).json({ msg: 'No quotes found' });
    }

    if (userId) {
      // Получаем только ID лайкнутых цитат пользователем
      const likedQuotes = await Quote.find({ likeBy: userId })
        .select('_id')
        .lean();

      // Создаём Set для быстрого поиска
      const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

      // Добавляем isLiked в каждую цитату
      popularQuotes.forEach((q) => {
        q.isLiked = likedSet.has(q._id.toString());
      });
    }

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
    const limit = 3;
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

    if (type === 'liked') {
      if (!username) {
        return res.status(400).json({
          error: 'Требуется имя пользователя для поиска лайкнутых цитат',
        });
      }

      const user = await User.findOne({ username }).lean();
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      filter = {
        _id: { $in: user.likedQuotes },
        text: { $regex: query, $options: 'i' },
      };
    }

    const quotes = await Quote.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({ path: 'userId', select: 'username level logo' })
      .lean();

    const totalQuotes = await Quote.countDocuments(filter);
    const hasMore = totalQuotes > skip + limit;

    const user = username ? await User.findOne({ username }).lean() : null;
    const userId = user ? user._id : null;

    const likedQuotes = userId
      ? await Quote.find({ likeBy: userId }).select('_id').lean()
      : [];

    const likedSet = new Set(likedQuotes.map((q) => q._id.toString()));

    quotes.forEach((q) => {
      q.isLiked = likedSet.has(q._id.toString());
    });

    res.json({ quotes, hasMore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
