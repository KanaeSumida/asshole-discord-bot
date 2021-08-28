const { prefix } = require('../config.json');
const Discord = require('discord.js');

function parseQuotes(str = '') {
    let current = '';
    let arr = [];
    let inQuotes = false;

    for(let char of str.trim()) {
        if(char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ' ' && !inQuotes) {
            //  If there's a space and we're not between quotes, push
            arr.push(current);
            current = '';
        } else {
            //  Otherwise add the character to the current word
            current += char;
        }
    }

    //  Push the last word
    arr.push(current);

    return arr;
}

module.exports = {
    name: 'message',
    execute(message) {
        //  If the message does not start with the bot prefix (found in config.json)
        //  or if the author of the message is recognized as a bot, we just ignore
        //  and return back.
        if(!message.content.startsWith(prefix) || message.author.bot) { return; }

        //  Removes the prefix from the start of the message with slice() and
        //  parses the arg supporting quoted arguments
        const args = parseQuotes(message.content.slice(prefix.length));

        //  We'll make use of the shift() ability to pull out the first index which
        //  is assumed to be the name of the command given.  We also need to ensure it
        //  is lowercase for matching purposes
        const commandName = args.shift().toLowerCase();

        //  Get a reference to the command object based on the given command name.
        //  The command given may also be an alias, so we'll check command aliases as well
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        //  Ensure the command exists for hte client.  If not, ignore and return
        if(!command) { return; }

        //  FIrst check to ensure the command is being executed in the correct environment.
        //  All commands have a guildOnly property that, if true, indicates that it can only
        //  be executed within a Discord server channel and not from DMs
        if(command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        //  Now check to ensure that the user has permissions to execute the comand given.
        //  Command permissions are set by the permissions property in the command file.
        if(command.permissions) {
            const authorPerms  = message.channel.permissionFor(message.author);
            
            if(!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You can not do this!');
            }
        }

        //  Next check if the command requires arguments and that arguments were actually provided
        if(command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}`;

            //  If the command object has a usage property, append it to the response to show
            //  the user the correct command usage
            if(command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        //  Get a reference to the client's colldowns collection
        const { cooldowns } = message.client;

        //  Check fi the colldowns collection has an existing key for the command
        //  being executed.  If not, create a new entry
        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        //  Get the current timestamp
        const now = Date.now();

        //  Calculate the total millisecond(s) that this command goes on cooldown for
        //  a user.  If the command has no cooldown specified, then we'lluse 3 seconds as
        //  a default amount
        const coooldownAmount = (command.colldown || 3) * 1000;

        //  Get the collection of cooldown timestamps that have been entered for
        //  this command
        const timestamps = cooldowns.get(command.name);

        //  Check if a timestamp exists for the message author.
        if(timestamps.has(message.author.id)) {
            
            //  Determine when the cooldown instance should expire
            const expirationTime = timestamps.get(message.author.id) + coooldownAmount;

            //  If it is not time fo rhte cooldown to expire, inform the author that they
            //  need to wait longer and return back
            if(now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reuising hte \`${command.name}\` command.`);
            }
        }

        //  No timestamp existed for the colldown for the author, so we add it now
        timestamps.set(message.author.id, now);

        //  This will handle automatically removing the cooldown timestamp after the required amount of time
        setTimeout(() => timestamps.delete(message.author.id), coooldownAmount);

        //  If this point is reached, then there are no issues with exeucting the command
        //  for the user
        try {
            command.execute(message, args);
        } catch(error) {
            console.error(error);
            message.reply('There was an error trying to execute that command');
        }
    }
}
//  ---------------------------------------------------------------
//  Executes every time a message is sent in a channel that the
//  client can see, as well as any DMs that are sent directly to
//  the client
//  ---------------------------------------------------------------