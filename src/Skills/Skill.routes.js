const express = require('express');
const routes = express.Router();

const SkillController = require('./Skill.controller');
routes.get('/skills', SkillController.getAll);

module.exports = routes;