// models
import { Client } from './clients.model';
import { User } from './users.model';


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