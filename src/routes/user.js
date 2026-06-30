const express = require('express');
const { register, login, getUsers, getUserById, deleteUser, addFavorite, updateRole, updateUser } = require('../controllers/user');
const { isAuth, isAdmin } = require('../middlewares/auth');
const { upload } = require('../config/cloudinary');

const userRoutes = express.Router();

userRoutes.post('/register', upload.single('image'), register);
userRoutes.post('/login', login);
userRoutes.get('/', isAuth, isAdmin, getUsers);
userRoutes.get('/:id', isAuth, getUserById);
userRoutes.delete('/:id', isAuth, deleteUser);
userRoutes.post('/favorites', isAuth, addFavorite);
userRoutes.put('/role/:id', isAuth, isAdmin, updateRole);
userRoutes.put('/:id', isAuth, upload.single('image'), updateUser);

module.exports = userRoutes;