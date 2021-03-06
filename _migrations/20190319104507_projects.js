exports.up = (knex, Promise) => {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.decimal('revenue', 10, 2);
    table.timestamp('begin_date');
    table.timestamp('finish_date');
    table.integer('squad_id');
    table.foreign('squad_id').references().inTable('squads');
    table.integer('client_id');
    table.foreign('client_id').references().inTable('clients');
    table.boolean('status').defaultTo(true);
    table.boolean('deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

}
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('projects');
};
