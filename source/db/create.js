const sqlite = require('sqlite3');
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

db.serialize(function() {
    //  Create the clock channel
    db.run('CREATE TABLE clock_channel ("channel_id" TEXT NOT NULL UNIQUE, "timezone" TEXT NOT NULL, "updated_at" TEXT NOT NULL, "created_at" TEXT NOT NULL)', (err) => {
        if(err) {
            throw err;
        }
    });

    
})





database.getDb()
    .then(db => new Promise((resolve, reject) => {
        const result = db.run('pragma table_info(\'clock_channel\');', (err) => {
            if(err) { reject(err); }
        });
        resolve({db: db, result: result});
    }))
    .then( res => new Promise((resolve, reject) => {
        console.log(res.result);
        resolve(res.db);
    }))
    .then(db => db.close())
    .catch(err => {console.error(err); });

// database.getDb()
//     .then(db => new Promise((resolve, reject) => {
//         db.serialize(function() {
//             //  Create the clock_channel table
//             db.run('CREATE TABLE clock_channel ("channel_id" TEXT NOT NULL UNIQUE, "timezone" TEXT NOT NULL, "updated_at" TEXT NOT NULL, "created_at" NOT NULL)', (err) => {
//                 if(err) { reject(err); }
//             });

//             resolve(db);
//         });
//     }))
//     .then(db => db.close())
//     .catch(err => { console.error(err); });

// db.close();

