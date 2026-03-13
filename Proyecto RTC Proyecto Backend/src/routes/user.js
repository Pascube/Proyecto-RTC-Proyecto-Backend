const express = require('express');
const { register, login, getUsers, deleteUser, addFavorite, updateRole } = require('../controllers/user');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { upload } = require('../config/cloudinary');

const userRoutes = express.Router();

userRoutes.post('/register', upload.single('image'), register);
userRoutes.post('/login', login);
userRoutes.get('/', isAuth, isAdmin, getUsers);
userRoutes.delete('/:id', isAuth, deleteUser);
userRoutes.post('/favorites', isAuth, addFavorite);
userRoutes.put('/role/:id', isAuth, isAdmin, updateRole);

module.exports = userRoutes;