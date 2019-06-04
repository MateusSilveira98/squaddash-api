const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
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