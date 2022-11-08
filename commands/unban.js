const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans the user with the specified ID.')
        .addStringOption(option =>
            option.setName('userid').setDescription('The ID of the user you want to unban.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

        async execute(inter) {
            const userID = inter.options.getString('userid');

            await inter.guild.members.unban(userID);
            inter.reply({content: 'User has been unbanned.', ephemeral: true});
        }
    }
