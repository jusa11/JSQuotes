require('dotenv').config();
const authRouter = require('./routes/authRoutes.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const Quote = require('./models/Quote.js');
const User = require('./models/User.js');
const Favorite = require('./models/Favorite.js');
const authMiddleware = require('./middleware/authMiddleware.js');

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
    const quotes = await Quote.find();
    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' }); // Если нет цитат, возвращаем ошибку
    }
    const randomQuote = getRandomQuote(quotes);
    res.json(randomQuote);
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

  try {
    const newQuote = new Quote({
      text,
      author,
      userId,
      date: new Date().toISOString(),
    });
    await newQuote.save();
    res.json(newQuote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Последние цитаты пользователя
app.get('/quotes/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const userQuotes = await Quote.find({ author: username })
      .sort({ date: -1 })
      .limit(4);

    if (!userQuotes || userQuotes.length === 0) {
      return res.status(404).json({ msg: 'No quotes found' }); // Если нет цитат, возвращаем ошибку
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
    console.log(username);

    const user = await User.findOne({ username })
      .sort({ date: -1 })
      .limit(4)
      .populate('likedQuotes');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
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
        (id) => id.toString() !== quoteId
      );
      quote.likes -= 1;
    } else {
      user.likedQuotes.push(quoteId);
      quote.likes += 1;
    }
    await user.save();
    await quote.save();
    console.log(quote.likes);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
