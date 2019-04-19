const express = require('express');
const routes = express.Router();

const ClientController = require('./Client.controller');
routes.get('/clients', ClientController.getAll);
routes.get('/client/:id', ClientController.getById);
routes.post('/client', ClientController.create);
routes.put('/client', ClientController.edit);

module.exports = routes;