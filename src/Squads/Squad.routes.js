const express = require('express');
const routes = express.Router();

const SquadController = require('./Squad.controller');
routes.get('/squads', SquadController.getAll);
routes.get('/squad/:id', SquadController.getById);
routes.post('/squad/create', SquadController.create);
routes.put('/squad/edit', SquadController.edit);

module.exports = routes;