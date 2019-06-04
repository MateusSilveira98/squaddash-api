
exports.up = function (knex, Promise) {
  return knex.schema.createTable('squads_employees', (table) => {
    table.increments('id').primary();
    table.integer('squad_id');
    table.foreign('squad_id').references().inTable('squads');
    table.integer('employee_id');
    table.foreign('employee_id').references().inTable('employees');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('squads_employees');
};
