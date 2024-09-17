const Client = require('../models/client');

// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clients', error });
  }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  try {
    const { documentoCliente, nombreCompleto, celular, fechaNacimiento } = req.body;

    const newClient = new Client({ documentoCliente, nombreCompleto, celular, fechaNacimiento });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating client', error });
  }
};

// Actualizar un cliente
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedClient = await Client.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating client', error });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting client', error });
  }
};
