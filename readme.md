<h1 align="center">djs-embed-builder</h1>
<br></br>

## Usage
```js
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
```


## Dependencies 
* [Discord.js@13.1.0](https://npmjs.com/package/discord.js)

## Examples
To see examples go to [examples.js](https://github.com/braxtongpoll/djs-embed-builder/blob/main/src/examples.js)

It's about 120% easy to use though.

## Contact 
* [Discord](https://plutothe.dev/discord)
* [Github](https://github.com/braxtongpoll)
* [Website](https://plutothe.dev/)

Read Me Made by [IceyyM8](https://iceyym8.dev)
