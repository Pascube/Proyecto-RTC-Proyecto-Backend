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

    const collections = await mongoose.connection.db.listCollections({ name: 'games' }).toArray();
    if (collections.length > 0) {
      await Game.deleteMany({});
    }

    await Game.insertMany(games);

    console.log('Seed completada correctamente');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

seedGames();