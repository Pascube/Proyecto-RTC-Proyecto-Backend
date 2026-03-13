const Game = require('../models/Game');

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    await Game.findByIdAndDelete(id);
    return res.status(200).json('Juego eliminado');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getGames, createGame, deleteGame };