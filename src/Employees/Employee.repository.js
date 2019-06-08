const knexConfig = require('../../knexfile').development;
const knex = require('knex')(knexConfig);
const _ = require('lodash');
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
      await knex('employees_skills').insert({ employee_id: employee.id, skill_id: skills[i].id });
    }
    return await knex('employees').where('id', employee.id).update(employee).returning('id');
  },
  async getAll() {
    let employees = await knex('employees')
      .where('employees.deleted', false)
      .orderBy('employees.name');
    employees = employees.map(employee => { employee.skills = []; return employee });
    let employees_skills = _.groupBy(await knex('employees_skills'), 'employee_id');
    for (let i = 0; i < employees.length; i++) {
      let skill_ids = employees_skills[employees[i].id].map(item => item.skill_id);
      for (let j = 0; j < skill_ids.length; j++) {
        let skill = await knex('skills')
          .where('id', skill_ids[j])
        employees[i].skills.push(skill[0]);
      }
    }
    return employees
  },
  async getById(id) {
    let employee = await knex('employees')
      .where('deleted', false)
      .andWhere('id', id)
      .orderBy('name');
    if (employee.length == 0) return null;
    employee = employee[0];
    employee.skills = [];
    let employees_skills = await knex('employees_skills').where('employee_id', id);
    let skills_ids = employees_skills.map(item => item.skill_id);
    for (let j = 0; j < skills_ids.length; j++) {
      let skill = await knex('skills')
      .where('id', skills_ids[j]);
      employee.skills.push(skill[0]);
    }
    return employee
  },
  async getByName(name) {
    const result = await knex('employees').where('name', name).andWhere('deleted', false);
    return result[0]
  }
}