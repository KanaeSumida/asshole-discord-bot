'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes} = require('sequelize');

//  The relative path to the models directory
const modelDir = './models';

//  Create the database object.
const db = {};

//  Create the database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    define: {
        underscored: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
    storage: path.join(__dirname, `./${process.env.NODE_ENV.toLowerCase()}.db`),
});

//  Read in all of the model files
fs.readdirSync(path.join(__dirname, modelDir))
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, modelDir, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

//  Setup relationship/associations for each model
Object.keys(db)
    .forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;