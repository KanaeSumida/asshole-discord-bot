const sqlite = require('sqlite3').verbose();
const path = require('path');

//  Get the environment that we are running in.
const env = process.env.NODE_ENV || 'development';

//  Resolve the fully-qualified path name to the database storage file.
const storage = path.resolve(__dirname, `${env.toLowerCase()}.db`);


module.exports = {
    /**
     * Configures and returns a new sqlite Database instance
     * @returns Database
     */
    getDb() {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database(storage, (err) => {
                if (err) {
                    reject(err);
                }
            });
            resolve(db);
        });
    }
}