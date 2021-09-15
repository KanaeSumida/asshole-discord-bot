'use strict';

const { MessageEmbed, Collection, Permissions } = require('discord.js');
const { MessageConfig, EmbedConfig } = require('../configs');

module.exports = {
    /**
     * The name of the event as called by discord.js
     */
    name: 'messageCreate',

    /**
     * Handles the execution of the 'messageCreate' event.
     * @param {Message} message - The message that was created.
     */
    execute(message) {
        //  If the message does not start with the bot prefix or if the author of
        //  the message is recognized as a bot, we just ignore nad return back early.
        if (!message.content.startsWith(MessageConfig.prefix) || message.author.bo) { return; }

        //  The command is sent something like this
        //
        //  !prefix <command_name> [argument_1] [argument_2]
        //
        //  parse out the command name and arguments from the message.
        //  we remove the prefix portation with slice()
        const unparsed = message.content.slice(MessageConfig.prefix.length);

        //  Parse the argumetns into an array, where each index is a seperate
        //  argument given.  Then function used allows arguments to be enclosed
        //  in quotes in the case that an argument is a string with spaces.
        const args = (function (str) {
            let current = '';
            let arr = [];
            let inQuotes = false;

            for (const char of str.trim()) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ' ' && !inQuotes) {
                    arr.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }

            arr.push(current);
            return arr;
        })(unparsed);

        //  The actual command given is the first argument always.  we can
        //  use shift() to pull out the first index.  We also need to set it
        //  to lowercase for matching purposes.
        const commandName = args.shift().toLowerCase();

        //  Get a reference to the command object based on the given command name.
        //  The command given may also be an alias, so we'll check command aliases as well.
        const command = message.client.messageCommands.get(commandName) ||
            message.client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        //  Ensure the command exists for the client.  If not, ignore and return back.
        if (!command) { return; }

        //  Next check fi the command is being executed in teh correct context.
        //  All commands have a guildOnly property that, if true, indicates that it
        //  can only be executed within a Discord server channel and not from DMs.
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('This message cannot be executed inside DMs!');
        }

        //  TODO: Implement command permissions
        if (command.permissions && !message.member.permissions.has(command.permissions)) {
            const embed = new MessageEmbed()
                .setColor(EmbedConfig.colors.warn)
                .setThumbnail(EmbedConfig.thumbnail)
                .setAuthor(EmbedConfig.author)
                .setTitle('Invalid Permission')
                .setDescription('You do not have permission to execute this command.');
            
            return message.reply({ embeds: [embed] });
        }

        //  Next check if the comamnd requires arguments and that the arguments were
        //  actually given
        if (command.args && args.length !== command.args) {
            const embed = new MessageEmbed()
                .setColor(EmbedConfig.color.danger)
                .setThumbnail(EmbedConfig.thumbnail)
                .setAuthor(EmbedConfig.author)
                .setTitle('Invalid Command Usage')
                .setDescription('You did not provide the correct number of arguments for this command')
                .addField('Command Usage', `${MessageConfig.prefix}${commandName} ${command.usage}`);
            
            return message.reply({ embeds: [embed] });
        }

        //  Check if this command has a cooldown and, if so, set the cooldown timer
        //  for the user executing the command again.
        if (command.cooldown) {
            //  Get a reference to the client's cooldowns collection
            const { cooldowns } = message.client;

            //  Check fi the cooldowns collection has an existing key for the command
            //  being executed.  if not, create a new entry.
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            }

            //  Get the current timestamp
            const now = Date.now();

            //  Calculate the total millisecond(s) that this command goes on cooldown for
            //  a user.
            const cooldownAmount = command.cooldown * 1000;

            //  Get the collection of cooldown timestamps that have been entered for
            //  this command.
            const timestamps = cooldowns.get(command.name);

            //  Check if a timestamp exists for the message author
            if (timestamps.has(message.author.id)) {
                //  Determine when the cooldown instance should expire
                const expirationTime = timestamps.get(message.author.is) + cooldownAmount;

                //  If it is not fime for the cooldown to expire, inform the author that they
                //  need to wait longer and return back
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const embed = new MessageEmbed()
                        .setColor(EmbedConfig.colors.warning)
                        .setThumbnail(EmbedConfig.thumbnail)
                        .setAuthor(EmbedConfig.author)
                        .setTitle('Command on Cooldown')
                        .setDescription(`You must wait ${timeLeft.toFixed(1)} more second(s) before you can execute this command again.`);
                    
                    return message.reply({ embeds: [embed] });
                }
            } else {
                //  No timestamp existed for the cooldown for the author, so creat one now
                timestamps.set(message.author.id, now);

                //  This will handle automatically removing the cooldown for the user after
                //  the time expires.
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        }

        //  If this point is reached, then there is no issue with executing the
        //  command for the user
        try {
            return command.execute(message, args);
        } catch (error) {
            console.error(error);

            const embed = new MessageEmbed()
                .setColor(EmbedConfig.colors.danger)
                .setThumbnail(EmbedConfig.thumbnail)
                .setAuthor(EmbedConfig.author)
                .setTitle('Error')
                .setDescription('There was an error trying to execute that command.  Please let Kanae know');
            
            return message.reply({ embeds: [embed] });
        }
    }
}