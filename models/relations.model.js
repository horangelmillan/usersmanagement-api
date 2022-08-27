// models
const { Client } = require('./clients.model');
const { User } = require('./users.model');


const relateModels = () => {
    // models relation
    User.hasMany(Client, {
        foreignKey: {
            allowNull: false
        }
    });
    Client.belongsTo(User);
};

module.exports = { relateModels };