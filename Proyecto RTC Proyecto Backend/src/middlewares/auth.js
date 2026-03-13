const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json('No autorizado');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) return res.status(401).json('Usuario no encontrado');
    
    next();
  } catch (error) {
    return res.status(401).json('Token inválido');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json('Acceso denegado: se requiere administrador');
  }
  next();
};

module.exports = { isAuth, isAdmin };