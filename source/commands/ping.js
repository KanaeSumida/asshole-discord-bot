const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const { commandStatus } = require('../utils/commandStatus.js');

module.exports = {
    status: commandStatus.ENABLED,
    cooldown: 5,
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Responds with pong!'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setTitle('Ping!')
            .setAuthor('Asshole Man', config.embed.thumbnail)
            .setDescription('PONG!')
            .setThumbnail(config.embed.thumbnail)
        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
};