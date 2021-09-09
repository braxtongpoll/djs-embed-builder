const { Client } = require('discord.js');
const djs = require(`djs-embed-builder`);
const client = new Client();
client.embed = new djs(client).createEmbed

client.on("interactionCreate", (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.commandName == "embed") {
        client.embed(interaction);
    };
});