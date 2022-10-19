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
            option.setName('reason').setDescription('The reason you are striking this user.')
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),

    async execute(inter) {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const { options, user } = inter;

        const userStrikeOption = options.getUser('user');
        const reasonStrikeOption = options.getString('reason');


        if (inter.member.roles.highest.position < inter.guild.members.cache.get(userStrikeOption.id).roles.highest.position) return inter.reply({content: 'Your role is not high enough to strike this user!', ephemeral: true});

        const newData = new staffStrike({
            IssuedBy : `${user.tag} (${user.id})`,
            UserID : userStrikeOption.id,
            Reason : reasonStrikeOption,
            Date : `${day}-${month}-${year} - DD/MM/YY`
        });

        await newData.save().catch(e => console.log('e'));

        const strikeCount = await staffStrike.count({UserID: userStrikeOption.id});

        const strikeEmbed = new EmbedBuilder()
            .setTitle('User Striked')
            .setColor(0XA020F0)
            .addFields(
                {name: 'User', value: userStrikeOption.tag},
                {name: 'Striked By', value: user.tag},
                {name: 'Reason', value: reasonStrikeOption}
            )
            .setTimestamp()
            .setFooter({text: `Strike ${strikeCount} / 3`})
        
        await inter.reply({embeds: [strikeEmbed]});

        staffLogs.execute('Strike', user, userStrikeOption , reasonStrikeOption, inter.channel);
    }
}