const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Sends back an image form of the users avatar.')
        .addUserOption(option => 
            option.setName('user').setDescription(`The user's avatar you want.`)
            .setRequired(true)
            ),

    async execute(inter) {
        const { options } = inter;

        const userOption = options.getUser('user');

        await inter.reply(userOption.avatarURL());
    }
}