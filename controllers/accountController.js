const bcrypt = require('bcrypt');
const Account = require('../models/account'); 
const Client = require('../models/client'); 

// Crear una cuenta
exports.createAccount = async (req, res) => {
    try {
        const { documentoCliente, fechaApertura, saldo, claveAcceso } = req.body;

        // Verificar si el cliente existe
        const client = await Client.findOne({ documentoCliente });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Generar el siguiente número de cuenta autoincremental
        const nextNumber = await Account.countDocuments() + 1;

        // Crear la nueva cuenta de ahorros
        const newAccount = new Account({
            numeroCuenta: nextNumber,
            documentoCliente,
            fechaApertura,
            saldo,
            claveAcceso: await bcrypt.hash(claveAcceso, 10) 
        });

        // Guardar la cuenta en la base de datos
        await newAccount.save();

        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error });
    }
};

// Consignar dinero
exports.consignMoney = async (req, res) => {
    try {
        const { numeroCuenta, valor } = req.body;
        if (valor <= 0) return res.status(400).json({ message: 'Consignation value must be positive' });

        const account = await Account.findOne({ numeroCuenta });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        account.saldo += valor;
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: 'Error consigning money', error });
    }
};

// Retirar dinero
exports.withdrawMoney = async (req, res) => {
    try {
        const { numeroCuenta, valor } = req.body;
        if (valor <= 0) return res.status(400).json({ message: 'Withdrawal value must be positive' });

        const account = await Account.findOne({ numeroCuenta });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        if (account.saldo < valor) return res.status(400).json({ message: 'Insufficient funds' });

        account.saldo -= valor;
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: 'Error withdrawing money', error });
    }
};

// Eliminar una cuenta
exports.deleteAccount = async (req, res) => {
    try {
        const { numeroCuenta } = req.params;
        const account = await Account.findOne({ numeroCuenta });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        if (account.saldo !== 0) return res.status(400).json({ message: 'Account balance must be zero to delete' });

        await Account.deleteOne({ numeroCuenta });
        res.status(200).json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error });
    }
};
