const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Gives you access to the rest of the server.'),
    
    async execute(inter) {
        const { member } = inter;

        if (member.roles.cache.some(role => role.id === '1028971253249355806')) return inter.reply({content: 'You are already verified!', ephemeral: true});

        try {
            await inter.reply({content: 'Adding roles.', ephemeral: true});

            await member.roles.remove('1028970938181636116');
            await member.roles.add('1028971253249355806');
        } catch {
            console.log('Error verify.js.');
        }
    }
}