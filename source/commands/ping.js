module.exports = {
    name: 'ping',
    description: 'Ping!',
    guildOnly: false,
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};