exports.up = (knex, Promise) => {
	return knex.schema.hasTable('employees').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('employees', (table) => {
				table.increments('id').primary();
				table.string('name');
				table.float('salary');
				table.string('photo').defaultTo('https://res.cloudinary.com/mateus-costa/image/upload/v1556203484/wtt/sem-foto.jpg');
				table.string('modality_of_contracting');
				table.string('profession');
				table.integer('squad_id').nullable();
        table.foreign('squad_id').references().inTable('squads');
				table.boolean('status').defaultTo(true);
				table.boolean('deleted').defaultTo(false);
				table.timestamp('created_at').defaultTo(knex.fn.now());
			});
		}
	});
};

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('employees');
};
