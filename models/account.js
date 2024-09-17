const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    numeroCuenta: {type: Number, required: true, unique: true},
    documentoCliente: {type: String, required: true},
    fechaApertura: {type: Date, required: true},
    saldo: {type: Number, required: true},
    claveAcceso: { type: String, required: true}
});

module.exports = mongoose.model('Account', accountSchema);
