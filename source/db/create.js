const sqlite = require('sqlite3').verbose();
const path = require('path');
const database = require('./index.js');

const envloader = require('../envloader.js');

//  Load environment variables
envloader.load(process.env.NODE_ENV);

const env = process.env.NODE_ENV || 'development';
const storage = path.resolve(__dirname, `${env.toLowerCase()}.db`);

const db = new sqlite.Database(storage, (err) => {
    if(err) {
        console.error(err);
    }
});

db.serialize(function () {
    //  Create the clock channel
    db.run('CREATE TABLE IF NOT EXISTS clock_channel ("channel_id" TEXT NOT NULL UNIQUE, "guild_id" TEXT NOT NULL, "timezone" TEXT NOT NULL, "updated_at" TEXT NOT NULL, "created_at" TEXT NOT NULL, PRIMARY KEY("channel_id"));', (err) => {
        if (err) {
            throw err;
        }
    });
});

db.close();

