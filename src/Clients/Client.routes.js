const express = require('express');
const routes = express.Router();

const ClientController = require('./Client.controller');
routes.get('/clients', ClientController.getAll);
routes.get('/client/:id', ClientController.getById);
routes.post('/client/create', ClientController.create);
routes.put('/client/edit', ClientController.edit);

module.exports = routes;