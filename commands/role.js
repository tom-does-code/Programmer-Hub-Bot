require('dotenv').config();

const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { clientID } = process.env;


module.exports = {
    data : new SlashCommandBuilder()
        .setName('role')
        .setDescription('Adds/removes role to selected user.')
        .addUserOption(option => 
            option.setName('target').setDescription('The user you want to role.')
            .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role').setDescription('The role you want to add/remove to the target.')
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

    async execute(interaction) {
        const userAddRole = interaction.options.getUser('target');
        const roleAdd = interaction.options.getRole('role');

        if (!roleAdd.editable) return interaction.reply({content: 'Role is higher than the bots role!', ephemeral: true});

        const memberAddRole = interaction.guild.members.cache.get(userAddRole.id);

        if (!userAddRole || !roleAdd || !memberAddRole || userAddRole.id === clientID) return interaction.reply({content: 'There was an issue with the role command.', ephemeral: true});
        if (roleAdd.name === 'everyone' || roleAdd.name === '@everyone') return interaction.reply({content: 'You cannot add the @everyone role!', ephemeral: true});

        let roleStatus;
        
        if (memberAddRole.roles.cache.has(roleAdd.id)) {
            try {
                memberAddRole.roles.remove(roleAdd);
                roleStatus = 'removed from';
            } catch {
                return interaction.reply({content: 'There was an error, most likely caused by the role you are giving being above the bots role.', ephemeral: true});
            }
        }
    
        if (!memberAddRole.roles.cache.has(roleAdd.id)) {
            try {
                memberAddRole.roles.add(roleAdd)
                roleStatus = 'added to';
            } catch {
                return interaction.reply({content: 'There was an error, most likely caused by the role you are giving being above the bots role.', ephemeral: true});
            }
        }

        const roleEmbed = new EmbedBuilder()
            .setTitle(`Successfuly edited user's role.`)
            .setDescription(`Role "${roleAdd.name}" was ${roleStatus} ${userAddRole.tag}.`)
            .setColor(0XA020F0)
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setTimestamp()
        await interaction.reply({embeds: [roleEmbed]});
    }
}