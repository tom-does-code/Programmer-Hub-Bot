const { SlashCommandBuilder, GatewayIntentBits, PermissionsBitField } = require('discord.js');

require('dotenv').config();

const staffLog = require('../templates/staff-logs');

const { logsID } = process.env;

module.exports = {
    data : new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Sets a message cooldown on the selected channel.')
        .addChannelOption(option => 
            option.setName('channel').setDescription('The channel you want to set a slowmode for.')
            .setRequired(true)
            )
        .addIntegerOption(option => 
            option.setName('cooldown').setDescription('The amount of seconds you want on the cooldown.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageEvents),

    async execute(inter) {
        const { options } = inter;

        const channelOption = options.getChannel('channel');
        const cooldownOption = options.getInteger('cooldown');

        if (cooldownOption > 90) return inter.reply({content: 'Cooldown is too long.', ephemeral: true});
        
        if (channelOption) {
            await channelOption.setRateLimitPerUser(cooldownOption, '');
            await inter.reply(`Slowmode was set.`);
        }
    }
}