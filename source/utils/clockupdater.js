const Discord = require('discord.js');
const moment = require('moment-timezone');
ß
const config = require('../config.json');

module.exports = function(client) {
    //  Fetch the guild
    const guild = client.guilds.fetch(config.guildid);

    //  Create an array of avaialble timezones
    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles'
    ]

    //  Get the current utc time;
    const now = moment().utc();

    //  Update the clock channels
    client.channels.fetch('815729186673131561')
        .then(channel => channel.setName(`${now.tz('America/New_York').format('hh:mmA z')}`));
    client.channels.fetch('815729295556739073')
        .then(channel => channel.setName(`${now.tz('America/Chicago').format('hh:mmA z')}`));
    client.channels.fetch('815729373659136061')
        .then(channel => channel.setName(`${now.tz('America/Denver').format('hh:mmA z')}`));
    client.channels.fetch('815729434715357236')
        .then(channel => channel.setName(`${now.tz('America/Los_Angeles').format('hh:mmA z')}`));

}

// module.exports = {

//     execute(client) {
//         const guild = client.guilds.fetch(config.guildid);
//         const timezones = [
//             'America/New_York',
//             'America/Chicago',
//             'America/Denver',
//             'America/Los_Angeles'
//         ]

//         let clockValues = [];
//         timezones.forEach(function(timezone) {
//             let now = moment().utc();
//             clockValues.push(now.tz(timezone).format('hh:mmA z'));
//         })

//         client.channels.fetch('815729186673131561')
//                         .then(channel => channel.setName(`${clockValues[0]}`));
//         client.channels.fetch('815729295556739073')
//                         .then(channel => channel.setName(`${clockValues[1]}`));
//         client.channels.fetch('815729373659136061')
//                         .then(channel => channel.setName(`${clockValues[2]}`));
//         client.channels.fetch('815729434715357236')
//                         .then(channel => channel.setName(`${clockValues[3]}`));

//     }
// }