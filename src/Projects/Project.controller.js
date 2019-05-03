const ProjectService = require('./Project.service');
module.exports = {
  async create(req, res) {
    const created = await ProjectService.create(req.body)
    return res.json(created);
  },
  async edit(req, res) {
    const updated = await ProjectService.edit(req.body)
    return res.json(updated);
  },
  async getAll(req, res) {
    const projects = await ProjectService.getAll();
    return res.json(projects);
  },
  async getById(req, res) {
    const project = await ProjectService.getById(req.params.id);
    return res.json(project);
  }
};