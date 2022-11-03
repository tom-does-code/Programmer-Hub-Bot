const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const moment = require('moment');

module.exports = {
    async execute(userObject, guild) {
        if (!userObject) return;

        const creationDate = moment.utc(userObject.createdAt).format('MMM Do YYYY, h:mm A');

        const welcomeChannel = guild.channels.cache.get('1037717297843937350');

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('New Member')
            .setColor(0XA020F0)
            .setDescription(`Welcome to the server, ${userObject.toString()}!`)
            .setThumbnail(userObject.avatarURL())
            .addFields(
                {name: 'User Created: ', value: creationDate}
            )
            .setFooter({text: userObject.id})
            .setTimestamp()
        
        await welcomeChannel.send({embeds: [welcomeEmbed]});
    }
}