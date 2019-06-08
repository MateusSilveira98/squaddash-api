
exports.up = (knex, Promise) => {
    return knex.schema.createTable('skills', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('status').defaultTo(true);
    });
  }
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('squads_employees');
  };
  