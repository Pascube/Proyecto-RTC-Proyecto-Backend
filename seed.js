require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Game = require('./src/models/Game');

const games = [
  { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Adventure' },
  { title: 'Elden Ring', genre: 'RPG' },
  { title: 'Super Mario Odyssey', genre: 'Platformer' },
  { title: 'Cyberpunk 2077', genre: 'Sci-Fi' },
  { title: 'Hollow Knight', genre: 'Metroidvania' }
];

const seedGames = async () => {
  try {
    await connectDB();
    await Game.deleteMany({});
    await Game.insertMany(games);
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

seedGames();