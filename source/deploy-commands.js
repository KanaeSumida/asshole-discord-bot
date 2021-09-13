'use strict';

const { REST } = require('@discordjs/rest');
const { Routes } = require ('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const envLoader = require('./envloader.js');

const { CommandStatus } = require('./bot/enums');
const slashCommandDir = path.resolve(__dirname, './bot/commands/slashcommands');

//  Load the correct environment varaibles based on the NODE_ENV
envLoader.load(process.env.NODE_DEV);

//  Holds all commands that we find
const commands = [];

//  Load all files that end with .js from the commands directory
const commandFiles = fs.readdirSync(slashCommandDir)
    .filter(file => file.endsWith('js'))
    .forEach(file => {
        const command = require(`${slashCommandDir}/${file}`);

        //  Only add the command if it is enabled or if we are in development environment and the status
        //  is local only
        if(command.status && (command.status === CommandStatus.ENABLED || (process.env.NODE_ENV === 'development' && command.status === CommandStatus.LOCALONLY))) {
            commands.push(command.data.toJSON());
        }
    }
);

//  Create the REST object we'll use to push the commands to the discord API
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

//  Push the commands to discord
(async () => {
    try {
        //  If we are in a production environment, then commmands are pushed as global.
        //  If we are in a development environment, then commanda are pushed to the development
        //  server only.
        //
        //  Note that for global commands, it can take up to 1h for Discord API to propagate
        //  the command to all servers that the bot is a part of.
        if(process.env.NODE_ENV === 'production') {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
        } else if(process.env.NODE_ENV === 'development') {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
        }
    } catch (error) {
        console.error(error);
    }
})();