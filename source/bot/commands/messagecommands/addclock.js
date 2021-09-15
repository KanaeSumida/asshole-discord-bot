'use strict';

const { EmbedConfig, DefaultEmbed, WarningEmbed, DangerEmbed} = require('../../configs');
const { MessageEmbed, Permissions } = require('discord.js');
const moment = require('moment-timezone');
const sqlite = require('sqlite3').verbose();
const path = require('path');
const { SymbolReactions } = require('../../reactions');

const env = process.env.NODE_ENV || 'development';
const storage = path.resolve(__dirname, `../../../db/${env.toLowerCase()}.db`);

console.log(storage);

module.exports = {
    /**
     * The name of the command that the user has to enter to use
     * e.g. !prefix <name>
     */
    name: 'addclock',

    usage: '<channel_id> <timezone>',

    /**
     * Indicates that this command requires arguments in order to use it properly
     */
    args: 2,

    /**
     * An Array that contains the permissions that are required of the user that
     * issues the command.
     */
    permission: [Permissions.FLAGS.MANAGE_CHANNELS],

    /**
     * A boolean that determines if this command can only be executed within a guild
     * environment. If false, this means the command can be executed within DMs as well.
     */
    guildOnly: true,

    /**
     * Executes this command
     * @param {Message} message
     * @param {Array<string>} args
     * @returns
     */
    async execute(message, args) {

        const channel_id = args[0];
        const timezone = args[1];
        const guild_id = message.guildId;

        //  Attempt to fetch the channel from the disocrd server that the message
        //  was initiated in.
        const channel = await message.guild.channels.fetch(channel_id);

        //  If the channel does not exist, then inform the user.
        if (!channel) {
            const embed = DangerEmbed()
                .setThumbnail(EmbedConfig.thumbnail)
                .setTitle('Invalid Channel')
                .setDescription(`No channel with the id: ${args[0]} exists for this server. Please verify the id and try again`);
            
            return message.reply({ embeds: [embed] });
        }

        //  Create a new database instance.
        const db = new sqlite.Database(storage, (err) => {
            if (err) {
                throw err;
            }
        });

        //  Insert the new clock channel into the database.
        db.serialize(function () {
            //  Check if the channel is already in the database
            let sql =
                'INSERT INTO "clock_channel" (channel_id, guild_id, timezone, created_at, updated_at) ' +
                'VALUES ($channel_id, $guild_id, $timezone, $created_at, $updated_at) ' +
                'ON CONFLICT(channel_id) DO UPDATE SET timezone=excluded.timezone, updated_at=excluded.updated_at;';

            db.run(sql, {
                $guild_id: guild_id,
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

        //  Update the channel with the curren time.
        const now = moment().utc().tz(timezone);
        const hour = now.hour() % 12;
        const minute = now.minute();

        let clock = 'clock';
        if (hour === 0) {
            clock += '12';
        } else {
            clock += `${hour}`;
        }

        if (minute >= 30) {
            clock += '30';
        };

        channel.setName(`${SymbolReactions[clock]} ${now.tz(timezone).format('hh:mma z')}`);

        const embed = DefaultEmbed()
            .setTitle('Clock Channel Added')
            .setDescription('Channel has been added successfully');
        
        message.reply({ embeds: [embed] });
    },
};
