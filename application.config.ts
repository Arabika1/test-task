export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: parseInt(process.env.APP_PORT) || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  DATABASE: {
    MYSQL_DIALECT: process.env.MYSQL_DIALECT || 'mysql',
    MYSQL_NAME: process.env.MYSQL_NAME,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_HOST: process.env.MYSQL_HOST,
  },
  JWT: {
    JWT_ACCESS_TOKEN_SECRET:
      process.env.JWT_ACCESS_TOKEN_SECRET || '3y5B8DaGdJfMjQmSpVsXuZx4z',
    CHALLENGE_JWT_SECRET:
      process.env.CHALLENGE_JWT_SECRET || 'pUrWtZw3y5B8DaFdJfMjQmSpV',
    APP_JWT_SECRET: process.env.APP_JWT_SECRET || 'some-secret',
    ALGORITHM: process.env.JWT_ALGORITHM || 'HS512',
    EXPIRES_IN: '12h',
    APP_JWT_EXPIRATION: '2h',
  },
};
