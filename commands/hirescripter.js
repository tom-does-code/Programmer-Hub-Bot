const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('hirescripter')
        .setDescription('Creates a post in #looking-for-scripter about your scripting needs.')
        .addStringOption(option => 
            option.setName('job').setDescription('What you want done.')
            .setRequired(true)
            )
        .addStringOption(option => 
            option.setName('payment').setDescription('How much will you be paying for this task? + (What currency, what payment method.)')
            .setRequired(true)
            ),
    async execute(inter) {
        const { options } = inter;

        const jobString = options.getString('job');
        const paymentString = options.getString('payment');

        if (jobString.length >= 700 || paymentString.length >= 200) return inter.reply({content: 'Text is too long.', ephemeral: true});

        if (paymentString && jobString) {
            await inter.reply({content: `Scripter hiring request has been sent for approval.`, ephemeral: true});

            const hiringRequestChannel = inter.guild.channels.cache.find(channel => channel.id === '1029436523143254017');

            const requestEmbed = new EmbedBuilder()
                .setTitle('New Scripter Hiring Post.')
                .setDescription(`Sent by ${inter.user.tag} (${inter.user.id})`)
                .setColor(0XA020F0)
                .addFields(
                    {name: 'Information: ', value: jobString},
                    {name: 'Payment: ', value: paymentString}
                )
                .setTimestamp()
            await hiringRequestChannel.send({embeds: [requestEmbed]});
        }
    }
}