'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandStatus } = require('../../enums');

module.exports = {
    /**
     * The status of the command. @see commandStatus
     */
    status: CommandStatus.LOCALONLY,

    /**
     * Data that is sent to the Discord API that describes this slash
     * command
     */
    data: new SlashCommandBuilder()
        .setName('partyfinder')
        .setDescription(
            'Creates a new party finder event that people can sign up for'
        )

        //  Name of the event
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('The name of the party finder event')
                .setRequired(true)
        )

        //  Party size of the event
        .addStringOption((option) =>
            option
                .setName('size')
                .setDescription('The size of the party')
                .setRequired(true)
                .addChoice('Light Party (4)', '4')
                .addChoice('Full Party (8)', '8')
                .addChoice('Alliance Party (24)', '24')
        )

        //  Date of the event
        .addStringOption((option) =>
            option
                .setName('date')
                .setDescription(
                    'The date of the event. You can enter Today, Tomorrow, or a month and day like Aug21'
                )
                .setRequired(true)
        )

        //  Start time of the event
        .addStringOption((option) =>
            option
                .setName('start')
                .setDescription('The start time of the event')
                .setRequired(true)
        )

        //  Timezone of the event
        .addStringOption((option) =>
            option
                .setName('timezone')
                .setDescription('The timezone')
                .setRequired(true)
                .addChoice('Eastern', 'et')
                .addChoice('Mountain', 'mt')
                .addChoice('Central', 'ct')
                .addChoice('Pacific', 'pt')
        ),

    /**
     * Handles the execution of this command when issued by a user on
     * discord.
     * @param {Interaction} interaction
     */
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const size = interaction.options.getString('size');
        const date = interaction.options.getString('date');
        const start = interaction.options.getString('start');
        const timezone = interaction.options.getString('timezone');

        interaction.guild.channels
            .create(name)
            .then((channel) => channel.setParent('881072725949579275'))
            .then((channel) =>
                channel.send(
                    `Event Details: Name: ${name} -- Size: ${size} -- Date: ${date} -- Start: ${start} -- Timezone: ${timezone}`
                )
            );

        await interaction.reply({
            content: 'Event created',
            ephemeral: true,
        });
    },
};
