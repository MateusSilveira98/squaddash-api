exports.up = (knex, Promise) => {
  return knex.schema.hasTable('projects').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('projects', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.decimal('salary');
        table.timestamp('begin_date');
        table.timestamp('finish_date');
        table.integer('squadId').nullable();
        table.foreign('squadId').references('id').inTable('squads');
        table.integer('clientId').nullable();
        table.foreign('clientId').references('id').inTable('clients');
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
