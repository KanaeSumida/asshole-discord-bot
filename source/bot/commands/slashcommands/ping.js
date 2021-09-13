'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { EmbedConfig } = require('../../configs');
const { CommandStatus } = require('../../enums');

module.exports = {
    /**
     * The status of the command. @see commandStatus
     */
    status: CommandStatus.ENABLED,

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
            .setColor(EmbedConfig.colors.default)
            .setTitle('Ping!')
            .setAuthor('Asshole Man', EmbedConfig.thumbnail)
            .setDescription('PONG!')
            .setThumbnail(EmbedConfig.thumbnail);

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};
