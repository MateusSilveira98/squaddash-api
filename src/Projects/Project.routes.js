const express = require('express');
const routes = express.Router();

const ProjectController = require('./Project.controller');
routes.get('/projects', ProjectController.getAll);
routes.get('/project/:id', ProjectController.getById);
routes.post('/project/create', ProjectController.create);
routes.put('/project/edit', ProjectController.edit);

module.exports = routes;