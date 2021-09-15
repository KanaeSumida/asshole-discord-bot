'use strict';
const { MessageEmbed } = require('discord.js');
const EmbedConfig = require('./embedconfig.json');
const MessageConfig = require('./messageconfig.json');

function createEmbed() {
    return new MessageEmbed()
        .setAuthor(EmbedConfig.author, EmbedConfig.thumbnail)

}

function createInfoEmbed() {
    return createEmbed().setColor(EmbedConfig.colors.default);
}

function createWarningEmbed() {
    return createEmbed().setColor(EmbedConfig.colors.warning);
}

function createDangerEmbed(){
    return createEmbed().setColor(EmbedConfig.colors.danger);
}

module.exports = {
    EmbedConfig: EmbedConfig,
    MessageConfig: MessageConfig,
    DefaultEmbed: createInfoEmbed,
    WarningEmbed: createWarningEmbed,
    DangerEmbed: createDangerEmbed,
};
