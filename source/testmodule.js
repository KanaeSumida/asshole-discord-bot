'use strict';

const sqlite = require('sqlite3').verbose();
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const storage = path.resolve(__dirname, `./db/${env.toLowerCase()}.db`);

console.log(storage);

module.exports = {
    /**
     * Executes this command
     * @param {Message} message
     * @param {Array<string>} args
     * @returns
     */
    async execute(args) {

        const channel_id = args[0];
        const timezone = args[1];

        //  Create a new database instance.
        const db = new sqlite.Database(storage, (err) => {
            if (err) {
                throw err;
            }
        });

        //  Insert the new clock channel into the database.
        db.serialize(function () {
            db.run('INSERT INTO "clock_channel" VALUES ($channel_id, $guild_id, $timezone, $created_at, $updated_at)', {
                $guild_id: 'test',
                $channel_id: channel_id,
                $timezone: timezone,
                $created_at: new Date().toISOString(),
                $updated_at: new Date().toISOString(),
            }, (result, err) => {
                if (err) {
                    throw err;
                }
            });
        });

        //  Close the database now that we're done with it.
        db.close((err) => {
            if (err) {
                throw err;
            }
        });
    },
};
