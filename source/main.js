const Discord  = require('discord.js');
const fs = require('fs');

const envLoader = require('./envloader.js');

// ---------------------------------------------------------------
//  Configure environment variables
// ---------------------------------------------------------------
envLoader.load(process.env.NODE_ENV);

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
