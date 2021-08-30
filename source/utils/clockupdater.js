const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment-timezone');


module.exports = {
    execute(client) {
        const guild = client.guilds.fetch(config.guildid);
        const timezones = [
            'America/New_York',
            'America/Chicago',
            'America/Denver',
            'America/Los_Angeles'
        ]

        let clockValues = [];
        timezones.forEach(function(timezone) {
            let now = moment().utc();
            clockValues.push(now.tz(timezone).format('hh:mmA z'));
        })

        client.channels.fetch('815729186673131561')
                        .then(channel => channel.setName(`${clockValues[0]}`));
        client.channels.fetch('815729295556739073')
                        .then(channel => channel.setName(`${clockValues[1]}`));
        client.channels.fetch('815729373659136061')
                        .then(channel => channel.setName(`${clockValues[2]}`));
        client.channels.fetch('815729434715357236')
                        .then(channel => channel.setName(`${clockValues[3]}`));

    }
}