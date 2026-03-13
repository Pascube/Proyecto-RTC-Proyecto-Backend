const express = require('express');
const { getGames, createGame, deleteGame } = require('../controllers/game');
const { isAuth, isAdmin } = require('../middlewares/auth');

const gameRoutes = express.Router();

gameRoutes.get('/', getGames);
gameRoutes.post('/', isAuth, isAdmin, createGame);
gameRoutes.delete('/:id', isAuth, isAdmin, deleteGame);

module.exports = gameRoutes;