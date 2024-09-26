import { Sequelize, DataTypes } from 'sequelize';
require('dotenv').config();

const paramsDev = {
    dialect: process.env.DEV_DIALECT,
    port: process.env.DEV_PORT,
    host: process.env.DEV_HOST,
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB,
    logging: false
};

const paramsProd = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    }
};

const db = new Sequelize(process.env.NODE_ENV === 'production' ? paramsProd : paramsDev);

export { db, DataTypes };