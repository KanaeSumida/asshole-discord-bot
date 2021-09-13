'use strict';

const { EmbedConfig } = require('../../configs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    cooldown: '10',
    guildOnly: true,
    execute(message) {
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
