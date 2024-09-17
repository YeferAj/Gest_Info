const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://fersonaj813:0813@cluster0.5rdme.mongodb.net/gestUser?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.log('Error connecting to MongoDB Atlas:', error));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
