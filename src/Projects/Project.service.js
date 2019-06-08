const ProjectRepository = require('./Project.repository');
const Callbacks = require('../_Helpers/Callbacks');
const Tools = require('../_Helpers/Tools');

module.exports = {
  async create(param) {
    try {
      const project = await ProjectRepository.getByName(param.name);
      if (project) throw 'este projeto já está criado! :(';
      await ProjectRepository.create(param);
      return Callbacks.callbackHandler('success', 'projeto criado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao criar o projeto! :(')
    }
  },
  async edit(param) {
    try {
      param.updated_at = Tools.formatDate(Date.now());
      const project = await ProjectRepository.getById(param.id);
      if (!project) throw 'projeto não encontrado! :(';
      Object.assign(project, param);
      delete project.client;
      delete project.squad;
      await ProjectRepository.edit(project);
      return Callbacks.callbackHandler('success', 'project alterado com sucesso! :)')
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao alterar o projeto! :(')
    }
  },
  async getAll() {
    try {
      const projects = await ProjectRepository.getAll();
      return projects
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar os projetos')
    }
  },
  async getById(id) {
    try {
      let project = await ProjectRepository.getById(id);
      return project
    } catch (error) {
      return Callbacks.callbackHandler('error', error || 'falha ao buscar o projeto')
    }
  }
}