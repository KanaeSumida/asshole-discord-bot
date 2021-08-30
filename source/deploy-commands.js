const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require ('discord-api-types/v9');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const globalCommands = [];
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if(command.global) {
        globalCommands.push(command.data.toJSON());
    } else {
        commands.push(command.data.toJSON());
    }
    // commands.push(command.data.toJSON());
}

// const commands = [
//     new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
//     new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
//     new SlashCommandBuilder().setName('user').setDescription('Replies with user info!')
// ].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
            { body: commands },
        );

        await rest.put(
            Routes.applicationCommands(process.env.CLIENTID),
            { body: globalCommands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();