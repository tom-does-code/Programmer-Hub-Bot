const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const staffLog = require('../templates/staff-logs');

const { logsID } = process.env;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks the selected user.')
        .addUserOption(option => 
            option.setName('target').setDescription('The user you want to kick')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason of the kick')
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
    async execute(interaction) {
        const userObject = interaction.options.getUser('target');
        const kickReason = interaction.options.getString('reason');

        const memberObject = interaction.guild.members.cache.get(userObject.id);

        if (!memberObject.kickable) return interaction.reply({content: 'I am unable to kick that player!', ephemeral: true});

        await memberObject.kick(`Kicked by ${interaction.user.tag} (${interaction.user.id} for: ${kickReason})`);

        const kickEmbed = new EmbedBuilder()
            .setTitle('Kicked Player')
            .setDescription(`${userObject.tag} was kicked for ${kickReason}`)
            .setColor(0XA020F0)
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setTimestamp()
        
        await interaction.reply({content: 'Successfuly kicked.', ephemeral: true});
        await interaction.channel.send({embeds: [kickEmbed]});

        staffLog.execute('Kick', interaction.user, userObject, `Reason: ${kickReason}`, interaction.channel);
        
    }
}