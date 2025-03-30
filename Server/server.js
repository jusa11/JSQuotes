require('dotenv').config();
const authRouter = require('./routes/authRoutes.js');
const quotesRouter = require('./routes/quotesRoute.js');
const usersRouter = require('./routes/usersRoute.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const Quote = require('./models/Quote.js');
const User = require('./models/User.js');

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/quotes', quotesRouter);
app.use('/user', usersRouter);
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

// Поиск
app.get('/search', async (req, res) => {
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
      select: 'username level', // Забираем username и level из User
    });

    const totalQuotes = await Quote.countDocuments(filter);
    const hasMore = totalQuotes > skip + limit;

    res.json({ quotes, hasMore });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
