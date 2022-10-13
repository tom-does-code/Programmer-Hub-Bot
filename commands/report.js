const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const reportData = require('../database/reportsdata');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('report')
        .setDescription('Sends a report to the staff team.')
        .addUserOption(option => 
            option.setName('user').setDescription('The user you are reporting.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason you are creating a report.')
            .setRequired(true)
        ),
    
    async execute(inter) {
        const { options } = inter;

        const reportEmbed = new EmbedBuilder()
            .setTitle('User Report')
            .setColor(0XA020F0)
            .addFields(
                {name: 'Author: ', value: `${inter.user.tag} (${inter.user.id})`},
                {name: 'Reported User: ', value: `${options.getUser('user').tag} (${options.getUser('user').id})`},
                {name: 'Reason: ', value: options.getString('reason')}
            )
            .setTimestamp();
        await inter.channel.guild.channels.cache.find(channel => channel.id === '1029167997262233620').send({embeds: [reportEmbed]});
        await inter.reply({content: 'Thank you for reporting this user, staff will be with you shortly.', ephemeral: true});

        const date = new Date();
        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

    const createdData = new reportData({
        ReportAuthor : `${inter.user.tag} (${inter.user.id})`,
        ReportedUser : `${options.getUser('user').tag}`,
        ReportedUserID : options.getUser('user').id,
        ReportReason : options.getString('reason'),
        ReportDate : `${day}-${month}-${year} - DD/MM/YY`
    })
    await createdData.save().catch(e => console.log(e));
}}