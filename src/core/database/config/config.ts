import CONFIG from '@application-config';
const { DATABASE } = CONFIG;

module.exports = {
  development: {
    dialect: DATABASE.MYSQL_DIALECT,
    host: DATABASE.MYSQL_HOST,
    port: DATABASE.MYSQL_PORT,
    username: DATABASE.MYSQL_USER,
    password: DATABASE.MYSQL_PASSWORD,
    database: DATABASE.MYSQL_NAME,
  },
};
