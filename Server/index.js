require('dotenv').config();
const authRouter = require('./routes/authRoutes.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const Quote = require('./models/Quote.js');
const User = require('./models/User.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const checkUserLevel = require('./utils/checkUserLevel.js');
const userLevels = require('./utils/userLevels.js');

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

function getRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  return randomQuote;
}

// Генерация цитаты
app.get('/random-quote', async (req, res) => {
  try {
    const quotes = await Quote.find().populate('userId');

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' });
    }
    const randomQuote = getRandomQuote(quotes);
    setTimeout(() => {
      res.json(randomQuote);
    }, 2000);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// все цитаты
app.get('/quotes', async (req, res) => {
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
});

// Последние цитаты
app.get('/last-quotes', async (req, res) => {
  try {
    const lastQuotes = await Quote.find().sort({ date: -1 }).limit(4);

    if (!lastQuotes || lastQuotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' }); // Если нет цитат, возвращаем ошибку
    }
    res.json(lastQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// добавить цитату
app.post('/add-quote', async (req, res) => {
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

    res.json(newQuote); // отправлять не только цитату а и username, кол-во цитат и level
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Левел пользователя
app.get('/users/level/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const currentCountQuotes = user.countQuote; // всего циатат у пользовател
    const levels = checkUserLevel(currentCountQuotes);
    const currentLevel = levels.currentLevel; // текущий левел пользователя
    const nextLevelCount = levels.nextLevelCount; // сколько всего цитат нужно для след. левела
    const titleLevel = levels.titleLevel;
    const needQuoteForNextLevel = nextLevelCount - currentCountQuotes; // сколько осталось цитат до след. левела
    const needQuoteForCurrnetLevel =
      userLevels[currentLevel + 1].amount - userLevels[currentLevel].amount; // сколько цитат на текущем левеле нужно добавить

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
});

// Цитаты пользователя
app.get('/quotes/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const userQuotes = await Quote.find({ author: username }).sort({
      date: -1,
    });
    if (!userQuotes || userQuotes.length === 0) {
      return res.status(200).json(userQuotes);
    }
    res.json(userQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Понравившиеся цитаты
app.get('/liked-quotes/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate({
      path: 'likedQuotes',
      options: { sort: { date: -1 }, limit: 4 },
    });

    if (!user) {
      return res.json({ message: 'Пользователь не найден' });
    }

    res.json(user.likedQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// лайк
app.post('/like/:quoteId', authMiddleware, async (req, res) => {
  try {
    const { quoteId } = req.params;
    const userId = req.user._id;

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
});

// Популярные цитаты
app.get('/popular-quotes', async (req, res) => {
  try {
    const popularQuotes = await Quote.find().sort({ likes: -1 }).limit(10);
    res.json(popularQuotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Поиск
app.get('/search', async (req, res) => {
  try {
    const { query, type, username } = req.query;

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

    const quotes = await Quote.find(filter).populate({
      path: 'userId',
      select: 'username level', // Забираем username и level из User
    });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
