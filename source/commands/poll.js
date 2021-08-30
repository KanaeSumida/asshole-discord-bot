const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const stringsanatize = require('../utils/stringsanatize.js');
const discordReaction = require('../utils/discordreactions.js');

function commandBuilder(numOptional) {
    builder = new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll that people can vote on')

        //  Question of the poll
        .addStringOption(option => 
            option.setName('question')
            .setDescription('The question you would like to ask for the poll')
            .setRequired(true))

        //  First Choice
        .addStringOption(option => 
            option.setName('choice1')
            .setDescription('The first choice')
            .setRequired(true))

        //  Second Choice
        .addStringOption(option => 
            option.setName('choice2')
            .setDescription('The second choice')
        .setRequired(true));

        //  Optional additional choices
        for(let i = 3; i <= numOptional + 2; i++) {
            builder.addStringOption(option => 
                option.setName(`choice${i}`)
                .setDescription(`Optional choice`)
                .setRequired(false));
        }

        return builder;
}

module.exports = {
    global: true,
    data: commandBuilder(13),  
    async execute(interaction) {
        //  Put the choices inside of an array. This is kinda pointless i think
        //  but i prefer working with it this way for now.
        const reactions = [];
        reactions.push(discordReaction.symbols.regional_indicator_a);
        reactions.push(discordReaction.symbols.regional_indicator_b);
        reactions.push(discordReaction.symbols.regional_indicator_c);
        reactions.push(discordReaction.symbols.regional_indicator_d);
        reactions.push(discordReaction.symbols.regional_indicator_e);
        reactions.push(discordReaction.symbols.regional_indicator_f);
        reactions.push(discordReaction.symbols.regional_indicator_g);
        reactions.push(discordReaction.symbols.regional_indicator_h);
        reactions.push(discordReaction.symbols.regional_indicator_i);
        reactions.push(discordReaction.symbols.regional_indicator_j);
        reactions.push(discordReaction.symbols.regional_indicator_k);
        reactions.push(discordReaction.symbols.regional_indicator_l);
        reactions.push(discordReaction.symbols.regional_indicator_m);
        reactions.push(discordReaction.symbols.regional_indicator_n);
        reactions.push(discordReaction.symbols.regional_indicator_o);


        let choices = [];
        for(let i = 1; i <= 15; i++) {
            let choice = interaction.options.getString(`choice${i}`);
            if(choice) {
                choice = stringsanatize.execute(choice);
                choices.push(choice);
            }
        }

        let choiceField = '';

        for(let i = 0; i < choices.length; i++) {
            choiceField += `${reactions[i]} = ${choices[i]}\n`;
        }

        //  Get the nickname used by the user who initiated the
        //  interaction
        const member = await interaction.guild.members.fetch(interaction.user);

        const embed = new MessageEmbed()
        embed.setColor(config.embed.color);

        if(member) {
            const nickname = member.nickname ? member.nickname : member.displayName;            
            if(member.user) {
                embed.setAuthor(nickname, member.user.avatarURL());
            } else {
                embed.setAuthor(nickname);
            }
        } else {
            embed.setAuthor('Asshole Man', config.embed.thumbnail);
            embed.setThumbnail(config.embed.thumbnail);
        }

        embed.setTitle('The following question has been asked');
        embed.setDescription(interaction.options.getString('question'));

        embed.addField('The following choices are available', choiceField);

        embed.addField('How to vote?', 'To vote in this poll, click the reaction to this post that matches your answer.  You may submit multiple votes');

        

        const message = await interaction.reply({embeds: [embed], fetchReply: true});

        try {
            for(let i = 0; i < choices.length; i++) {
                await message.react(reactions[i]);
            }
        } catch (error) {
            console.error(error)
            console.error(`Failed to react to message with emoji}`);
        }

    }      
}