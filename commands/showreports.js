const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

const reportData = require('../database/reportsdata');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('showreports')
        .setDescription('Shows a list of the reports made against this user.')
        .addUserOption(option => 
            option.setName('user').setDescription(`The user you want to see's reports.`)
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
        
    async execute(inter) {
        let reportsString = '';
        const { options } = inter;

        const reportedUser = options.getUser('user');
        let count = 1;

        const foundEntries = await reportData.find({ReportedUserID: reportedUser.id});

        foundEntries.forEach((entry) => {
            reportsString += `${count}. Reported By: ${entry.ReportAuthor}. \n Reason: ${entry.ReportReason} \n Date Reported: ${entry.ReportDate}.\n \n`;
            
            count += 1;
        });

        const userReportEmbed = new EmbedBuilder()
            .setColor(0XA020F0)
            .setTitle(`${reportedUser.tag}'s Reports`)
            .setDescription(reportsString)
            .setTimestamp()
            .setAuthor({name: inter.user.username, iconURL: inter.user.avatarURL()});
        
        await inter.reply({embeds: [userReportEmbed]});
    }
}