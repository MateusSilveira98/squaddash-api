exports.up = (knex, Promise) => {
  return knex.schema.hasTable('squads').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('squads', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.boolean('status').defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
				table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('squads');
};