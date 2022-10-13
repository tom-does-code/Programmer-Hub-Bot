const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

const warns = require('../database/infractionsdata');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns the user and goes on their record.')
        .addUserOption(option => 
            option.setName('user').setDescription('The user you want to warn.')
            .setRequired(true)
            )
        .addStringOption(option =>
            option.setName('reason').setDescription('The reason you are warning this person.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

    async execute(inter) {
        let date = new Date();
        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        date = `$${day}-${month}-${year} - DD-MM-YY`;

        const { options } = inter;

        const userWarned = options.getUser('user');
        const warnReason = options.getString('reason');

        const warnCount = await warns.count({UserID: userWarned.id});

        if (warnCount < 5) {
            const warnData = new warns({
                UserID : userWarned.id,
                ModeratorID : `${inter.user.tag} (${inter.user.id})`,
                Type : 'Warn',
                Reason : warnReason,
                Date : date
            });
            await warnData.save().catch(e => console.log(e));
            try {
                await userWarned.send(`You were warned in ${inter.guild.name} for ${warnReason}`);
            } catch {
                console.log(`Can't DM user`);   
            }
            await inter.reply({content: `${userWarned.tag} has been warned for ${warnReason}`});
        } else {
           if (warnCount >= 5) {
            const banData = new warns({
                UserID : userWarned.id,
                ModeratorID : `${inter.user.tag} (${inter.user.id})`,
                Type : 'Ban',
                Reason : `5+ warns, warn reason: ${warnReason}`,
                Date : date
            });
            await banData.save().catch(error => {
                console.log(error);
            });
            await inter.reply({content: `${userWarned.tag} has been banned for 5+ warns.`});
            
            try {
                await userWarned.send(`You have been banned from ${inter.guild.name} for 5+ warns, warn reason: ${warnReason}`);
            } catch {
                console.log(`Can't dm user `);
            }
            inter.guild.members.cache.get(userWarned.id).ban({reason: `5+ warns, warn reason: ${warnReason}`}).catch(error => {
                console.log(error)
            });
           }
        }
    }
}