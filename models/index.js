import Sequelize from 'sequelize';
import config from '../config';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  ...config[process.env.NODE_ENV || 'development'],
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default(sequelize);
