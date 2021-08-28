const Discord  = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

// ---------------------------------------------------------------
//  Configure environment variables
// ---------------------------------------------------------------
dotenv.config();

// ---------------------------------------------------------------
//  Setup new instance of the discord client
// ---------------------------------------------------------------
const client = new Discord.Client({
    intents:[
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.GUILD_MEMBERS,
                Discord.Intents.FLAGS.GUILD_BANS,
                Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
                Discord.Intents.FLAGS.GUILD_WEBHOOKS,
                Discord.Intents.FLAGS.GUILD_INVITES,
                Discord.Intents.FLAGS.GUILD_VOICE_STATES,
                Discord.Intents.FLAGS.GUILD_PRESENCES,
                Discord.Intents.FLAGS.GUILD_MESSAGES,
                Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Discord.Intents.FLAGS.DIRECT_MESSAGES,
                Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
            ]
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// ---------------------------------------------------------------
//  Setup command handling for the Discord client
// ---------------------------------------------------------------
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// //  Get a list of all directories located inside the commands directory
// const commandDirs = fs.readdirSync('./commands');

// //  Process each command directory
// for (const folder of commandDirs) {
//     //  Get a collection of all files within the command directory that end with .js only
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

//     //  Process each command file
//     for(const file of commandFiles) {
//         const command = require(`./commands/${folder}/${file}`);
//         client.commands.set(command.name, command);
//         console.log(`Command Added: ${command.name}`);
//     }
// }

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

