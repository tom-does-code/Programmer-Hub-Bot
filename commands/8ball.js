const { SlashCommandBuilder, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const { execute } = require('./role');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Responds with a 100% accurate opinion (:')
        .addStringOption(option => (
            option.setName('question').setDescription('Your question for the magic 8 ball.')
            .setRequired(true)
        )),
    
    async execute(inter) {
        const { user, options } = inter;

        const question = options.getString('question');

        const responses = [
            'wtf no lmao',
            'yeah of course',
            'yeah probably',
            'never',
            'fuck no',
            'hell yeah',
            'definitely',
            'LMAOOOOOOOOOOOO NO'
        ];

        const randomAnswer = Math.floor(Math.random() * responses.length);

        const ballEmbed = new EmbedBuilder()
            .setColor(0XA020F0)
            .setTitle(`${user.tag} asked the magic 8 ball a question.`)
            .addFields(
                {name: "Question:", value: question, inline: true},
                {name: "Answer", value: responses[randomAnswer], inline: true}
            )
            .setAuthor({name: user.tag, iconURL: user.avatarURL()})
            .setTimestamp()

        await inter.reply({embeds: [ballEmbed]});
    }
        
}