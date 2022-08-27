const { app } = require('./app');
const { db } = require('./utils/database_util');
const { relateModels } = require('./models/relations.model');
require('dotenv').config();

const initServer = async () => {
    try {
        await db.authenticate()
            .then(() => console.log('database is authenticated'));

        relateModels();

        await db.sync()
            .then(() => console.log(
                'database is synced',
                /* generate a ramdom number with ->  require('crypto').randomBytes(64).toString('hex') */
            ));

    } catch (err) {
        return console.log(err, 'something went wrong with the database connection, the server will not start.')
    };

    app.listen(process.env.PORT || 4000, () => {
        console.log(`server listen on port ${process.env.PORT}`)
    });
};

initServer();