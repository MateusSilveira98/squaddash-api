const express = require('express');
const routes = express.Router();

const ClientRoutes = require('./Clients/Client.routes');
const SquadRoutes = require('./Squads/Squad.routes');
const EmployeeRoutes = require('./Employees/Employee.routes');
const UserRoutes = require('./Users/User.routes');
const ProjectRoutes = require('./Projects/Project.routes');
const ReportRoutes = require('./Reports/Report.routes');
const SkillRoutes = require('./Skills/Skill.routes');
const MonthlySquadRoutes = require('./MonthlySquads/MonthlySquad.routes');

routes.use(ClientRoutes);
routes.use(SquadRoutes);
routes.use(EmployeeRoutes);
routes.use(UserRoutes);
routes.use(ProjectRoutes);
routes.use(ReportRoutes);
routes.use(SkillRoutes);
routes.use(MonthlySquadRoutes);

module.exports = routes;