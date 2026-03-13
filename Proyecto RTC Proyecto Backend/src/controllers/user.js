const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../config/cloudinary');

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.role = 'user';
    if (req.file) newUser.image = req.file.path;
    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json('Usuario o contraseña incorrectos');

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' });
      return res.status(200).json({ token, user });
    }
    return res.status(400).json('Usuario o contraseña incorrectos');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('favorites');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (user && user.image) {
      const imgSplitted = user.image.split('/');
      const nameSplitted = imgSplitted[imgSplitted.length - 1].split('.');
      const folder = imgSplitted[imgSplitted.length - 2];
      const public_id = `${folder}/${nameSplitted[0]}`;
      await cloudinary.uploader.destroy(public_id);
    }
    
    await User.findByIdAndDelete(id);
    return res.status(200).json('Usuario eliminado');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addFavorite = async (req, res) => {
  try {
    const { gameId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: gameId } },
      { new: true }
    ).populate('favorites');
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: req.body.role },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { 
  register, 
  login, 
  getUsers, 
  deleteUser, 
  addFavorite, 
  updateRole 
};