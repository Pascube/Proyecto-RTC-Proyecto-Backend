require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user');
const gameRoutes = require('./src/routes/game');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.use((req, res, next) => {
  return res.status(404).json('Route not found');
});

app.use((error, req, res, next) => {
  console.log('Error interceptado:', error);
  return res.status(500).json(error.message || 'Error interno');
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});