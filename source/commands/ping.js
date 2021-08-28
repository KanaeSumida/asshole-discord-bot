const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Responds with pong!'),
    async execute(interaction) {
        await interaction.reply({
            content: 'Pong!',
            ephemeral: true
        })
    }
};