exports.up = (knex, Promise) => {
	return knex.schema.hasTable('employees').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('employees', (table) => {
				table.increments('id').primary();
				table.string('name').nullable();
				table.decimal('salary').nullable();
				table.string('modality_of_contracting').nullable();
				table.string('profession').nullable();
				table.integer('squad_id').nullable();
				table.foreign('squad_id').references('id').inTable('squads');
				table.boolean('status').defaultTo(true);
				table.boolean('deleted').defaultTo(false);
				table.timestamp('created_at').defaultTo(knex.fn.now());
				table.timestamp('updated_at').defaultTo(knex.fn.now());
			});
		}
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('employees');
};
