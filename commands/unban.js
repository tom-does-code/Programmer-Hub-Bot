const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans the user with the specified ID.')
        .addIntegerOption(option =>
            option.setName('userid').setDescription('The ID of the user you want to unban.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageEvents),

        async execute(inter) {
            const userID = inter.options.getInteger('userid')
        }
    }