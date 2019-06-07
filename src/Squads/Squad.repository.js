const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
const _ = require('lodash');
module.exports = {
  async create(squad) {
    let created = '';
    let employees = squad.employees;
    delete squad.employees;
    let squad_id = await knex('squads').insert(squad).returning('id');
    for (let i = 0; i < employees.length; i++) {
      created = await knex('squads_employees').insert({ squad_id: squad_id[0], employee_id: employees[i].id }).returning(['id']);
    }
    return created
  },
  async edit(squad) {
    let employees = squad.employees;
    delete squad.employees;
    await knex('squads_employees')
      .where('squad_id', squad.id)
      .del();
    for (let i = 0; i < employees.length; i++) {
      await knex('squads_employees').insert({ squad_id: squad.id, employee_id: employees[i].id });
    }
    return await knex('squads').where('id', squad.id).update(squad);
  },
  async getAll() {
    let squads = await knex('squads')
      .where('squads.deleted', false)
      .orderBy('squads.name');
    squads = squads.map(squad => { squad.employees = []; return squad });
    let squadsemployees = _.groupBy(await knex('squads_employees'), 'squad_id');
    for (let i = 0; i < squads.length; i++) {
      let employee_ids = squadsemployees[squads[i].id].map(item => item.employee_id);
      for (let j = 0; j < employee_ids.length; j++) {
        let employee = await knex('employees')
          .where('id', employee_ids[j])
          .andWhere('deleted', false);
        squads[i].employees.push(employee[0])
      }
    }
    return squads
  },
  async getById(id) {
    let squad = await knex('squads')
      .where('squads.deleted', false)
      .andWhere('squads.id', id)
      .orderBy('squads.name');
    if (squad.length == 0) return null;
    squad = squad[0];
    squad.employees = [];
    let squadsemployees = await knex('squads_employees').where('squad_id', id);
    let employee_ids = squadsemployees.map(item => item.employee_id);
    for (let j = 0; j < employee_ids.length; j++) {
      let employee = await knex('employees')
        .where('id', employee_ids[j])
        .andWhere('deleted', false);
      squad.employees.push(employee[0])
    }
    return squad
  },
  async getByName(name) {
    const result = await knex('squads').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}