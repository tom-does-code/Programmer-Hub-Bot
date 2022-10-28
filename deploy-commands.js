const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const { token, clientID, guildID } = process.env;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const rest = new REST({version: '10'}).setToken(token);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    commands.push(command.data.toJSON());
}

rest.put(Routes.applicationCommands(clientID), {body: commands})
    .then((data) => console.log(`Registed ${data.length} commands`))
    .catch(console.error);