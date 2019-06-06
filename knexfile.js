// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'squaddash',
      password: 'DEVsquaddash',
      database: 'squaddash_db'
    },
    migrations: {
      directory: './_migrations'
    },
    seeds: {
      directory: './_seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};