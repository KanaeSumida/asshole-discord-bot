'use strict';

const { Client, Intents, Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');

const slashCommandDir = './commands/slashcommands';
const messageCommandsDir = './commands/messagecommands';
const eventsDir = './events';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Intents.FLAGS.GUILD_INTEGRATIONS,
        // Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        // Intents.FLAGS.GUILD_VOICE_STATES,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

//  Collection that holds all registered slash commands that a user can issue.
client.slashCommands = new Collection();

//  Collection that holds all registered message commands that a user can issue.
client.messageCommands = new Collection();

//  Collection that holds the cooldown timers for commands that have cooldowns.
client.cooldowns = new Collection();

//  Get all js files in the ./slashcommands directory, bring them in, and add them
//  to the slashCommands collection
fs.readdirSync(path.resolve(__dirname, slashCommandDir))
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const slashCommand = require(path.resolve(__dirname, `${slashCommandDir}/${file}`));
        client.slashCommands.set(slashCommand.data.name, slashCommand);
    });

//  Get all the js files in the ./messagecommands directory, bring them in, and add them
//  to the messageCommands collection.
fs.readdirSync(path.resolve(__dirname, messageCommandsDir))
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const messageCommand = require(path.resolve(__dirname, `${messageCommandsDir}/${file}`));
        client.messageCommands.set(messageCommand.name, messageCommand);
    });

//  Get all of the js files in the ./events direcotry, bring them in, and set up
//  the event to be handled with the client
fs.readdirSync(path.resolve(__dirname, eventsDir))
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(path.resolve(__dirname, `${eventsDir}/${file}`));

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    });

module.exports = client;