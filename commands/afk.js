const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Tells other users if you are afk or not.'),

    async execute(inter) {
        const { member } = inter;     
        const prevNickname = member.displayName;

            if (!prevNickname.includes('[AFK]')) {
                member.setNickname(`[AFK] ${prevNickname}`).catch((err) => {
                    console.log(`Error using AFK command. Error Name: ${err.name} /n Error Message: ${err.message}`);
                })
                await inter.reply({content: 'AFK status set.', ephemeral: true});
            } else {
                member.setNickname(prevNickname.replace('[AFK]', '')).catch((err) => {
                    console.log(`Error using AFK command. Error Name: ${err.name} \n Error Message: ${err.message}`);
                })
                await inter.reply({content: 'AFK status removed.', ephemeral: true});
            }
    }
}