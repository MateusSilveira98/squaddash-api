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
      projects[i].cost = 0;
      projects[i].dev = moment(Date.now()) <= projects[i].finish_date ? 
        'Em desenvolvimento' : 
        moment(Date.now()) > projects[i].finish_date && projects[i].status ? 
        'Atrasado' :
        (moment(Date.now()) >= projects[i].finish_date || moment(Date.now()) <= projects[i].finish_date) && !projects[i].status ?
        'Entregue' : 'Pendente de algo';
      let squad = await knex('squads').where('id', projects[i].squad_id);
      let client = await knex('clients').where('id', projects[i].client_id);
      projects[i].squad = squad[0];
      projects[i].client = client[0];
      let squadsemployees = await knex('squads_employees').where('squad_id', squad[0].id);
      let employee_ids = squadsemployees.map(item => item.employee_id);
      projects[i].monthlyCost = 0;
      for (let j = 0; j < employee_ids.length; j++) {
        let employee = await knex('employees')
        .where('id', employee_ids[j])
        .andWhere('deleted', false);
        let beginYear = moment(projects[i].begin_date).year();
        let beginMonth = moment(projects[i].begin_date).month();
        let beginDay = moment(projects[i].begin_date).day();
        let finishYear = moment(projects[i].finish_date).year();
        let finishMonth = moment(projects[i].finish_date).month();
        let finishDay = moment(projects[i].finish_date).day();
        let date = Math.round(moment([finishYear, finishMonth, finishDay]).diff(moment([beginYear, beginMonth, beginDay]), 'months', true));
        projects[i].monthlyCost += Number(employee[0].salary);
        let cost = Number(employee[0].salary) * date == 0 ? Number(employee[0].salary) : Number(employee[0].salary) * date;
        projects[i].cost = projects[i].cost + cost;
      }
      projects[i].balance = projects[i].gains - projects[i].cost;
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