const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

require('dotenv').config();

const staffLog = require('../templates/staff-logs');

const { logsID } = process.env;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Stops the user from being able to speak for the set amount of time.')
        .addUserOption(option => 
            option.setName('target').setDescription('The user you want to mute.')
            .setRequired(true)
            )
        .addIntegerOption(option =>
            option.setName('length').setDescription('The length you want to mute the target in HOURS.')
            .setRequired(true)
            )
        .addStringOption(option => 
            option.setName('reason').setDescription('The reason for the mute.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

        async execute(interaction) {
            const timeoutUser = interaction.options.getUser('target');
            const timeoutLength = interaction.options.getInteger('length') * 3600 * 1000;
            const timeoutReason = interaction.options.getString('reason');

            if (!timeoutUser || !timeoutLength || !timeoutReason) return interaction.reply({content: 'This is a rare error, damn wtf have you done!?', ephemeral: true});

            const memberTimeout = interaction.guild.members.cache.get(timeoutUser.id);
            
            if (!memberTimeout || !memberTimeout.kickable) return interaction.reply({content: `User couldn't be found in this server!`, ephemeral: true});

            await memberTimeout.timeout(timeoutLength, timeoutReason);

            const timeoutEmbed = new EmbedBuilder()
                .setColor(0XA020F0)
                .setTitle("User timed out.")
                .setDescription(`${timeoutUser.tag} has been timed out for ${timeoutLength / 3600 / 1000} hours.`)
                .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
                .setTimestamp()
                .addFields(
                    { name: "Reason:", value: timeoutReason, inline: true},
                    { name: "Timed out by:", value: `${interaction.user.tag} (${interaction.user.id})`, inline: false }
                    )
           await interaction.reply({embeds: [timeoutEmbed]});

        staffLog.execute('Muted User', interaction.user, timeoutUser, `Reason: ${timeoutReason} \nLength: ${timeoutLength / 3600 / 1000} hours.`, interaction.channel);

        }
    }