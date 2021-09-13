'use strict';

const moment = require('moment-timezone');

module.exports = async (db, client) => {
    const now = moment().utc();

    await db.clock_channel.findAll()
        .then(clock => {
            console.log(clock.channel_id);
            client.channels.fetch(clock.channel_id)
                .then(async channel => {
                    if(channel) {
                        channel.setName(`${now.tz(clock.timezone).format('hh:mmA z')}`);
                    } else {
                        db.clock_channel.destory({ where: { channel_id: clock.channel_id } });
                    }
                });
        });
};