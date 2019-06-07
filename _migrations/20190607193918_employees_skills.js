
exports.up = (knex, Promise) => {
  return knex.schema.createTable('employees_skills', (table) => {
    table.increments('id').primary();
    table.integer('skill_id');
    table.foreign('skill_id').references().inTable('skills');
    table.integer('employee_id');
    table.foreign('employee_id').references().inTable('employees');
  });
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('employees_skills');
};
