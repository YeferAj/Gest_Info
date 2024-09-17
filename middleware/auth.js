const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para manejar JWT

// Middleware de autenticación
module.exports = (req, res, next) => {
    // Obtener el token desde el encabezado de la solicitud
    const token = req.header('Authorization');
    
    // Verificar si el token está presente
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Verificar el token con el secreto definido en .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Asignar los datos del usuario al objeto de solicitud
        next(); // Continuar con la ejecución del siguiente middleware o controlador
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' }); // Manejar token inválido
    }
};
