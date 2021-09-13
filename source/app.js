'use strict';

const Bot = require('./bot');
const envLoader = require('./envloader.js');
const clockUpdater = require('./utils/clockupdater.js');

//  Load environment variables
envLoader.load(process.env.NODE_ENV);

//  Setup database stuff
const db = require('./db');
(async () => {
    await db.sequelize.sync();
})();

// await db.sequelize.sync();

db.clock_channel
    .findAll()
    .then((result) => console.log(result.channel_id))
    .catch((error) => console.log(error));

// //  Store the database instance on the bot itself so it can be accessed
// //  by the various commands
// Bot.db = db;

// //  Setup events to run on a timer once the bot is ready
// Bot.once('ready', async () => {
//     //  Update Clocks immediatly
//     clockUpdater(db, Bot);

//     const mins = new Date().getMinutes();
//     const minsToWait = 30;
//     const interval = minsToWait * 60000;
//     const timeout = (minsToWait - (mins % minsToWait)) * 60000;
//     setTimeout(() => {
//         setInterval(() => {
//             clockUpdater(db, Bot);
//         }, interval);
//     }, timeout);
// });

// Bot.login(process.env.TOKEN);
