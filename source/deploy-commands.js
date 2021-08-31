const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require ('discord-api-types/v9');
const fs = require('fs');

const { commandStatus } = require('./utils/commandStatus.js');
const envLoader = require('./envloader.js');

//  Load the correct environment varaibles based on the NODE_ENV
require('./envloader.js')(process.env.NODE_ENV);

//  Holds all commands that we find
const commands = [];

//  Load all files that end with .js from the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for(const file of commandFiles) {
    //  Load the command
    const command = require(`./commands/${file}`);

    //  Only add the command if it is enabled or if we are in a development environment and the status
    //  is local only
    if(command.status) {
        if(command.status === commandStatus.ENABLED || (process.env.NODE_ENV == 'development' && command.status === commandStatus.LOCALONLY)) {
            commands.push(command.data.toJSON());
        }
    }
}

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
                routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
        } else if(process.env.NODE_ENV === 'development') {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
            )
        }
    } catch (error) {
        console.error(error);
    }
})();

// const globalCommands = [];
// const commands = [];
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

// for(const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     if(command.global) {
//         globalCommands.push(command.data.toJSON());
//     } else {
//         commands.push(command.data.toJSON());
//     }
//     // commands.push(command.data.toJSON());
// }

// // const commands = [
// //     new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// //     new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// //     new SlashCommandBuilder().setName('user').setDescription('Replies with user info!')
// // ].map(command => command.toJSON());

// const rest = new REST({ version: '9'})
// if(process.env.NODE_ENV === 'production') {
//     rest.setToken(process.env.PROD_TOKEN);
// } else {
//     rest.setToken(process.env.DEV_TOKEN);
// }
// // const rest = new REST({ version: '9' }).setToken(process.env.NODE_ENV === 'production' ? process.env.PROD_TOKEN : process.env.DEV_TOKEN);

// (async () => {
//     try {
//         if(process.env.NODE_ENV === 'production') {
//             await rest.put(
//                 Routes.applicationGuildCommands(process.env.PROD_CLIENT_ID, process.env.PROD_GUILD_ID),
//                 {
//                     body: commands
//                 }
//             );

//             await rest.put(
//                 Routes.applicationCommands(process.env.PROD_CLIENT_ID),
//                 {
//                     body: globalCommands
//                 }
//             )
//         } else if(process.env.NODE_ENV === 'development') {
//             await rest.put(
//                 Routes.applicationGuildCommands(process.env.DEV_CLIENT_ID, process.env.DEV_GUILD_ID),
//                 {
//                     body: commands
//                 }
//             );

//             await rest.put(
//                 Routes.applicationCommands(process.env.DEV_CLIENT_ID),
//                 {
//                     body: globalCommands
//                 }
//             ) 
//         }
        
//         console.log('Successfully registered application commands.');
//     } catch (error) {
//         console.error(error);
//     }
// })();