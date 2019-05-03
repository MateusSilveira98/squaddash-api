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
    const employees = await knex('employees').where('deleted', false);
    const squads = await knex('squads').where('deleted', false);
    const clients = await knex('clients').where('deleted', false);
    return projects.map(project => {
      project.squad = squads.find(squad => squad.id == project.squad_id);
      project.client = clients.find(client => client.id == project.client_id);
      project.squad.cost = employees.length > 0 ? employees.length > 1 ?
        employees.reduce((acumulator, current) => Number(acumulator.salary) + Number(current.salary)) :
        Number(employees[0].salary) : 0
      return project
    });
  },
  async getById(id) {
    let project = await knex('projects')
      .where('id', id)
      .andWhere('deleted', false)
      .orderBy('name');
    project = project[0];
    const squads = await knex('squads').where('id', project.squad_id).andWhere('deleted', false);
    const clients = await knex('clients').where('id', project.client_id).andWhere('deleted', false);
    project.squad = squads[0];
    project.client = clients[0];
    const employees = await knex('employees').where('squad_id', project.squad_id).andWhere('deleted', false);
    project.squad.cost = employees.length > 0 ? employees.length > 1 ?
      employees.reduce((acumulator, current) => Number(acumulator.salary) + Number(current.salary)) :
      Number(employees[0].salary) : 0
    return project
  },
  async getByName(name) {
    const result = await knex('projects').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}