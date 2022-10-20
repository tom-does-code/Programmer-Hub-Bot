const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about the user.')
        .addUserOption(option =>
            option.setName('user').setDescription('The information of the user you want to display.')
            .setRequired(true)
            ),

    async execute (inter) {
        const { options } = inter;

        const userOption = options.getUser('user');

        const member = inter.guild.members.cache.get(userOption.id);
        const joinDate = moment.utc(member.joinedAt).format('MMM Do YYYY, h:mm A');
        const creationDate = moment.utc(userOption.createdAt).format('MMM Do YYYY, h:mm A');

        const highestRole = member.roles.highest;

        const infoEmbed = new EmbedBuilder()
            .setTitle(`${userOption.username}'s Information`)
            .setColor(0XA020F0)
            .addFields(
                {name: 'Joined', value: joinDate, inline: true},
                {name: 'Registered', value: creationDate, inline: true},
                {name: 'Highest Role', value: highestRole.toString()},
            )
            .setAuthor({name: inter.user.username, iconURL: inter.user.avatarURL()})
            .setTimestamp()
            .setThumbnail(userOption.avatarURL())
        
        await inter.reply({embeds: [infoEmbed]});
    }
}