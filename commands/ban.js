const { SlashCommandBuilder, EmbedBuilder, GatewayIntentBits, PermissionsBitField, messageLink } = require('discord.js');

require('dotenv').config();

const staffLog = require('../templates/staff-logs');

const { logsID } = process.env;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans the targeted player.')
        .addUserOption(option => 
            option.setName('target').setDescription('The user you want to ban.')
            .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason for the ban.')
            .setRequired(true)
            )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageEvents),

    async execute(interaction) {
        const banUser = interaction.options.getUser('target');
        const banReason = interaction.options.getString('reason');

        if (!banUser) return;

        if (interaction.member.roles.highest.position < interaction.guild.members.cache.get(banUser.id).roles.highest.position) return interaction.reply({content: 'Your role is not high enough to ban this user!', ephemeral: true});

        const memberObject = interaction.guild.members.cache.get(banUser.id);

        if (!memberObject) return;
        if (!memberObject.bannable) {
            interaction.reply({content: 'I am unable to ban that user!', ephemeral: true});
            return;
        }
        
        try {
            await banUser.send(`You have been banned from ${interaction.guild.name}.`);
        } catch {
            console.log(`User can't be messaged.`);
        }

        
        const banEmbed = new EmbedBuilder()
            .setColor(0XA020F0)
            .setTitle("Banned user.")
            .setDescription(`${banUser.tag} has been banned for ${banReason}.`)
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setTimestamp()
        await interaction.reply({embeds: [banEmbed]});

        staffLog.execute('Banned User', interaction.user, banUser, `Reason: ${banReason}`, interaction.channel);

        memberObject.ban({reason: banReason}).catch(error => {
            console.log(error)
        });
    }
}