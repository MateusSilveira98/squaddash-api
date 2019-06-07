const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
const moment = require('moment');
module.exports = {
  async create(project) {
    return await knex('projects').insert(project);
  },
  async edit(project) {
    return await knex('projects').where('id', project.id).update(project);
  },
  async getAll() {
    let projects = await knex('projects')
      .where('deleted', false)
      .orderBy('name');
    for (let i = 0; i < projects.length; i++) {
      let squad = await knex('squads').where('id', projects[i].squad_id);
      let client = await knex('clients').where('id', projects[i].client_id);
      projects[i].squad = squad[0];
      projects[i].client = client[0];
    }
    return projects
  },
  async getById(id) {
    let project = await knex('projects')
      .where('id', id)
      .andWhere('deleted', false)
      .orderBy('name');
    project = project[0];
    return project
  },
  async getByName(name) {
    const result = await knex('projects').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}