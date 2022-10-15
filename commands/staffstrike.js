const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

require('dotenv').config();

const staffStrike = require('../database/staffstrikedata');
const staffLogs = require('../templates/staff-logs');

module.exports =  {
    data : new SlashCommandBuilder()
        .setName('strike')
        .setDescription('Gives the user a staff strike.')
        .addUserOption(option => 
            option.setName('user').setDescription('The user you want to strike.')
            .setRequired(true)
            )
        .addStringOption(option => 
            option.setName('reason').setDescription('The reason you are striking this user. Please include full detail otherwise the strike will be denied.')
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(inter) {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const { options, user } = inter;

        const userStrikeOption = options.getUser('user');
        const reasonStrikeOption = options.getString('reason');

        const newData = new staffStrike({
            IssuedBy : `${user.tag} (${user.id})`,
            UserID : userStrikeOption.id,
            Reason : reasonStrikeOption,
            Date : `${day}-${month}-${year} - DD/MM/YY`
        });

        await newData.save().catch(e => console.log('e'));

        staffLogs.execute('Strike', `${user.tag} (${user.id})`, `${userStrikeOption.tag} (${userStrikeOption.id})`, reasonStrikeOption, inter.channel);
    }
}