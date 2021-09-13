'use strict';

import { EmbedConfig } from '../../configs';
import { MessageEmbed, Permissions } from 'discord.js';
const db = require('../../db');

module.exports = {
    /**
     * The name of the command that the user has to enter to use
     * e.g. !prefix <name>
     */
    name: 'addclock',

    usage: '<channel_id>',

    /**
     * Indicates that this command requires arguments in order to use it properly
     */
    args: true,

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
    execute(message, args) {
        const embed = new MessageEmbed();
        embed.setColor(EmbedConfig.colors.default);
        embed.setAuthor(EmbedConfig.author);
        embed.setTitle('Pong');
        embed.setDescription('Was a game');

        return message.reply({
            embeds: [embed],
            ephimeral: true,
        });
    },
};
