const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');


module.exports = {
    global: true,
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Replies with information about this bot'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setTitle('About Asshole Man')
            .setAuthor('Asshole Man', config.embed.thumbnail)
            .setDescription('I\'m the Asshole Man and I\'m here to fuck shit up! Don\'t make me call my asshole friends!')
            .setThumbnail(config.embed.thumbnail)


        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
};