require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
  		user: process.env.DB_USER,
  		password: process.env.DB_PASSWORD,
  		database: process.env.DATA_BASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/Database/migrations`
    }
  }
}
