const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const { commandStatus } = require('../utils/commandStatus.js');

module.exports = {
    /**
     * The status of the command. @see commandStatus
     */
    status: commandStatus.ENABLED,

    /**
     * Data that is sent to the Discord API that describes this slash
     * command 
     */
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Responds with pong!'),

    /**
     * Handles the execution of this command when issued by a user on 
     * discord.
     * @param {Interaction} interaction 
     */
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