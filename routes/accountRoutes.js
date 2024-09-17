const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); // Asegúrate de que esta ruta es correcta

// Rutas para cuentas
router.post('/', accountController.createAccount); // Asegúrate de que createAccount esté definido en accountController
router.post('/consign', accountController.consignMoney); // Asegúrate de que consignMoney esté definido en accountController
router.post('/withdraw', accountController.withdrawMoney); // Asegúrate de que withdrawMoney esté definido en accountController
router.delete('/:numeroCuenta', accountController.deleteAccount); // Asegúrate de que deleteAccount esté definido en accountController

module.exports = router;
