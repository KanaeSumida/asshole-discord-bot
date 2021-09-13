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
        .setName('about')
        .setDescription('Replies with information about this bot'),

    /**
     * Handles the execution of this command when issued by a user on
     * discord.
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(EmbedConfig.colors.default)
            .setTitle('About Asshole Man')
            .setAuthor('Asshole Man', EmbedConfig.thumbnail)
            .setDescription(
                "I'm the Asshole Man and I'm here to fuck shit up! Don't make me call my asshole friends!"
            )
            .setThumbnail(EmbedConfig.thumbnail);

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};
