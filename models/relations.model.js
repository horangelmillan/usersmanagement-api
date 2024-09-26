// models
import { Client } from './clients.model.js';
import { User } from './users.model.js';


const relateModels = () => {
    // models relation
    User.hasMany(Client, {
        foreignKey: {
            allowNull: false
        }
    });
    Client.belongsTo(User);
};

export default { relateModels };