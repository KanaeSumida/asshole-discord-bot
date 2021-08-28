const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Replies with information about this bot'),
    async execute(interaction) {
        await interaction.reply({
            content: `I'm the asshole man and I'm here to fuck shit up! Don't make me call my asshole friends!`,
            ephemeral: true
        })
    }
};