const express = require('express');
const { getGames, getGameById, createGame, updateGame, deleteGame } = require('../controllers/game');
const { isAuth, isAdmin } = require('../middlewares/auth');

const gameRoutes = express.Router();

gameRoutes.get('/', getGames);
gameRoutes.get('/:id', getGameById);
gameRoutes.post('/', isAuth, isAdmin, createGame);
gameRoutes.put('/:id', isAuth, isAdmin, updateGame);
gameRoutes.delete('/:id', isAuth, isAdmin, deleteGame);

module.exports = gameRoutes;