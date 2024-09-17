const bcrypt = require('bcrypt');
const User = require('../models/user'); // Ajusta la ruta si es necesario

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { nombreUsuario, password, estado } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            nombreUsuario,
            password: hashedPassword,
            estado
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
    try {
        const { nombreUsuario, password } = req.body;

        const user = await User.findOne({ nombreUsuario });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreUsuario, password, estado } = req.body;

        // Si se proporciona una nueva contraseña, encriptarla
        const updateData = {
            nombreUsuario,
            estado
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
