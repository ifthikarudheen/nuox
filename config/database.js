
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const db = process.env.DB_NAME
const db_host = process.env.DB_HOST
const sequelize = new Sequelize(db, user, password, {
    host: db_host,
    dialect: 'mysql', // Change to your database type
});

export default sequelize