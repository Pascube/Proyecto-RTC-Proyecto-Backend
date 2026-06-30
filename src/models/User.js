const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  // Evita doble hasheo cuando el password ya viene cifrado.
  if (typeof this.password === 'string' && this.password.startsWith('$2')) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

module.exports = mongoose.model('User', userSchema);