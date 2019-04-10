exports.up = (knex, Promise) => {
  return knex.schema.hasTable('projects').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('projects', (table) => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.decimal('salary').nullable();
        table.timestamp('begin_date').nullable();
        table.timestamp('finish_date').nullable();
        table.integer('squad_id').nullable();
        table.foreign('squad_id').references('id').inTable('squads');
        table.integer('client_id').nullable();
        table.foreign('client_id').references('id').inTable('clients');
        table.boolean('status').defaultTo(true);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
};
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('projects');
};
