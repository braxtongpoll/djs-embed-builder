const { Client } = require('discord.js');
const djs = require(`djs-embed-builder`);
const client = new Client();
client.embed = new djs(client).createEmbed

client.on("interactionCreate", (client, interaction) => {
    if (interaction.commandName == "embed") {
        client.embed(interaction);
    };
});

client.on("messageCreate", (client, message) => {
    let prefix = "+";
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    if (command == "embed") {
        client.embed(message);
    };
});