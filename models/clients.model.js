const { db, DataTypes } = require('../utils/database_util');

const Client = db.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    DI: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenumberOne: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phonenumberTwo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    addressOne: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressTwo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Client };