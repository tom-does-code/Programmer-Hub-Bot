const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const { logsID } = process.env;

module.exports = {
    async execute(action, author, actionedUser, reason, channel) {
        const staffLogEmbed = new EmbedBuilder()
            .setTitle('New Staff Action')
            .setColor(0XA020F0)
            .addFields(
                {name: "Staff Member: ", value: `${author.tag} (${author.id})`, inline: false},
                {name: "User: ", value: `${actionedUser.tag} (${actionedUser.id})`, inline: false},
                {name: "Action: ", value: action, inline: false},
                {name: "Extra Info: ", value: reason, inline: false}

            )
            .setAuthor({name: author.tag, iconURL: author.avatarURL()})
            .setTimestamp()
        
        await channel.guild.channels.cache.find(channel => channel.id === logsID).send({embeds: [staffLogEmbed]});
    }
}