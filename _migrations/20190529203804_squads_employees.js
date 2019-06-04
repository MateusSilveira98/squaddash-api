
exports.up = (knex, Promise) => {
  const schema = knex.schema.createTable('squads_employees', (table) => {
    table.increments('id').primary();
    table.integer('squad_id');
    table.foreign('squad_id').references().inTable('squads');
    table.integer('employee_id');
    table.foreign('employee_id').references().inTable('employees');
  });
  return knex.schema.hasTable('squads_employees').then((exists) => {
    if (!exists) {
      return schema
    } else {
      return knex.schema.dropTable('squads_employees').then(() => {
        return schema
      });
    }
  });
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('squads_employees');
};
