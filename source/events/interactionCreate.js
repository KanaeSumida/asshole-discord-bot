const { MessageEmbed } = require('discord.js');
const confg = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        //  oNly handle command interactions
        if(!interaction.isCommand()) { return; }

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) { return; }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                .setColor('#f00')
                .setTitle('Error')
                .setDescription('There was an error executing your command')
                .setThumbnail(config.embed.thumbnail)

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        
    }
};