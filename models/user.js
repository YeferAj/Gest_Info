const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estado: { type: String, enum: ['activo', 'inactivo'], required: true }
});

module.exports = mongoose.model('User', userSchema);
