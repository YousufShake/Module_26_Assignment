const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost/mern8-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

module.exports = app;
