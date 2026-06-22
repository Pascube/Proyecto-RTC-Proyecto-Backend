const Game = require('../models/Game');

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json('Juego no encontrado');
    return res.status(200).json(game);
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

const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGame) return res.status(404).json('Juego no encontrado');
    return res.status(200).json(updatedGame);
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

module.exports = { getGames, getGameById, createGame, updateGame, deleteGame };