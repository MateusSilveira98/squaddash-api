const express = require('express');
const routes = express.Router();

const UserController = require('./User.controller');

routes.get('/users/:id', UserController.getAll);
routes.get('/user/:id', UserController.getById);
routes.post('/user/create', UserController.create);
routes.put('/user/edit', UserController.edit);
routes.post('/user/login', UserController.login);

module.exports = routes;