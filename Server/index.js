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

// Последние цитаты
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
  const { text, author } = req.body;

  try {
    const newQuote = new Quote({
      text,
      author,
      date: new Date().toISOString(),
    });
    await newQuote.save();
    res.json(newQuote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Лайк
app.post('/quotes/:id/like', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ msg: 'Цитата не найдена' });
    }

    quote.likes += 1;
    await quote.save();

    res.json({ likes: quote.likes });
  } catch (error) {
    console.error('Ошибка при добавлении лайка:', error);
    res.status(500).send('Ошибка сервера');
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
