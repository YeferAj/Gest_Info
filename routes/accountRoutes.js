const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); 

// Rutas para cuentas
router.post('/', accountController.createAccount); 
router.post('/consign', accountController.consignMoney); 
router.post('/withdraw', accountController.withdrawMoney);
router.delete('/:numeroCuenta', accountController.deleteAccount); 

module.exports = router;
