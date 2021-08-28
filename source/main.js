const { Client, Intents } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

// ---------------------------------------------------------------
//  Configure environment variables
// ---------------------------------------------------------------
dotenv.config();

// ---------------------------------------------------------------
//  Setup new instance of the discord client
// ---------------------------------------------------------------
const client = new Client({
    intents:[
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING

            ]
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// ---------------------------------------------------------------
//  Setup command handling for the Discord client
// ---------------------------------------------------------------
//  Get a list of all directories located inside the commands directory
const commandDirs = fs.readdirSync('./commands');

//  Process each command directory
for (const folder of commandDirs) {
    //  Get a collection of all files within the command directory that end with .js only
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    //  Process each command file
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log(`Command Added: ${command.name}`);
    }
}

// ---------------------------------------------------------------
//  Setup event handling for the Discord Client
// ---------------------------------------------------------------
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//  Process each event file
for(const file of eventFiles) {
    const event = require(`./events/${file}`);

    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// ---------------------------------------------------------------
//  Log the Discord bot in, this starts the entire process
// ---------------------------------------------------------------
client.login(process.env.TOKEN);

