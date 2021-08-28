const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'about',
    description: 'Provides information about this bot',
    guildOnly: false,
    execute(message, args) {
        const embedReply = new Discord.MessageEmbed()
            .setColor(config.embed.color)
            .setThumbnail(config.embed.thumbnail)
            .setTitle('Asshole Man')
            .setDescription('Here to fuck shit up!')
            .addField('See You Saturday', 'Don\'t make me call my asshole friends.');
        
        message.channel.send({embeds: [embedReply] });
    },
};