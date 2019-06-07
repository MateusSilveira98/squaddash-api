const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
module.exports = {
  async create(employee) {
    let created = '';
    let skills = employee.skills;
    delete employee.skills;
    let employee_id =  await knex('employees').insert(employee).returning('id');
    for (let i = 0; i < skills.length; i++) {
      created = await knex('employees_skills').insert({ employee_id: employee_id[0], skill_id: skills[i].id }).returning('id');
    }
    return created
  },
  async edit(employee) {
    let skills = employee.skills;
    delete employee.skills;
    await knex('employees_skills')
      .where('employee_id', employee.id)
      .del();
    for (let i = 0; i < skills.length; i++) {
      await knex('employees_skills').insert({ employee_id: employee.id, employee_id: skills[i].id });
    }
    return await knex('employees').where('id', employee.id).update(employee).returning('id');
  },
  async getAll() {
    const result = await knex('employees').where('deleted', false).orderBy('name');
    return result
  },
  async getById(id) {
    const result = await knex('employees').where('id', id).andWhere('deleted', false);
    return result[0]
  },
  async getByName(name) {
    const result = await knex('employees').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}