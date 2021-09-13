'use strict';

const { MessageEmbed } = require('discord.js');
const { EmbedConfig } = require('../configs');

module.exports = {
    /**
     * The name of the event as called by discord.js
     */
    name: 'interactionCreate',

    async execute(interaction) {
        //  We only handle 'command' interactions.  If this is not a command,
        //  end early and return back
        if (!interaction.isCommand()) {
            return;
        }

        //  Get a reference to the command by name.
        const command = interaction.client.slashCommands.get(
            interaction.commandName
        );

        //  Ensure we found the command.  If no command was found with the name given,
        //  end early and return back.
        if (!command) {
            return;
        }

        //  Attempt to execute the command.
        try {
            await command.execute(interaction);
        } catch (error) {
            //  Log the error to the console.
            console.error(error);

            //  Create an embed that we can send to the user to inform them
            //  that there was an error
            const embed = new MessageEmbed()
                .setColor(EmbedConfigs.colors.danger)
                .setThumbnail(EmbedConfig.thumbnail)
                .setAuthor(EmbedConfig.author)
                .setTitle('Sorry Not Sorry')
                .setDescription('There was an error executing your comand.');

            //  Reply back to the user to let them know there was an error
            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    },
};
