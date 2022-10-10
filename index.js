const path = require('node:path');
const fs = require('node:fs');

require('dotenv').config();

const { SlashCommandBuilder, Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = process.env;

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.on('guildMemberAdd', async member => {
    const unverifiedRole = member.guild.roles.cache.get('1028970938181636116');
    const verifyChannel = member.guild.channels.cache.get('1028970914815168583');

    await member.roles.add(unverifiedRole);
    console.log('added');

    await verifyChannel.send(`${member.user.toString()} Use /verify to gain access to the rest of the server.`);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(token);