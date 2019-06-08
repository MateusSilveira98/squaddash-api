const ProjectRepository = require('./Project.repository');
const Tools = require('../_Helpers/Tools');

module.exports = {
  async create(param) {
    const project = await ProjectRepository.getByName(param.name);
    if (project) throw 'este projeto já está criado! :(';
    return await ProjectRepository.create(param);
  },
  async edit(param) {
    param.updated_at = Tools.formatDate(Date.now());
    const project = await ProjectRepository.getById(param.id);
    if (!project) throw 'projeto não encontrado! :(';
    Object.assign(project, param);
    delete project.client;
    delete project.squad;
    return await ProjectRepository.edit(project);
  },
  async getAll() {
    return await ProjectRepository.getAll();
  },
  async getById(id) {
    let project = await ProjectRepository.getById(id);
    if (!project) throw 'projeto não encontrado! :(';
    return project
  }
}