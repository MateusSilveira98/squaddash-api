const express = require('express');
const routes = express.Router();

const MonthlySquadController = require('./MonthlySquad.controller');
routes.get('/monthlysquads', MonthlySquadController.getAll);
routes.get('/monthlysquad/:id', MonthlySquadController.getById);
routes.post('/monthlysquad/create', MonthlySquadController.create);
routes.put('/monthlysquad/edit', MonthlySquadController.edit);

module.exports = routes;