const { MessageEmbed } = require('discord.js');
const confg = require('../config.json');

module.exports = {
    /**
     * The name of the event as called by discord.js
     */
    name: 'interactionCreate',

    /**
     * Handles the execute of the 'interactionCreate' event
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        //  We only handle 'command' interactions.  If this is
        //  not a command, end early and return back.
        if(!interaction.isCommand()) { return; }

        //  Get a refrence to the command by name.
        const command = interaction.client.commands.get(interaction.commandName);

        //  Ensure we found the command. If no command was found with the name given,
        //  end early and return back.
        if(!command) { return; }

        //  Attempt to execut the command.
        try {
            await command.execute(interaction);
        } catch (error) {

            //  Log the error to the console
            console.error(error);

            //  Create an embed that we can send to the user to inform them
            //  that there was an error.
            const embed = new MessageEmbed();
            embed.setColor(config.embed.colors.danger);
            embed.setTitle('Sorry Not Sorry');
            embed.setDescription('There was an error executing your command.');
            embed.setThumbnail(config.embed.thumbnail);

            //  Reply back to the user to let them know there was an error.
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

    }
};