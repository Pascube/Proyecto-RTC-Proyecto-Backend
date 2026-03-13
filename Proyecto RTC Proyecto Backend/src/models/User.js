const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Types.ObjectId, ref: 'Game' }]
}, { timestamps: true });

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);