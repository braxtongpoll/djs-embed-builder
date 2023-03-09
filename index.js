const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
class betterDJS {
	constructor(client) {
		this.client = client;
	}
	async createEmbed(interaction, preDefinedEmbed) {
		let bool = 1;
		let embed = preDefinedEmbed
			? preDefinedEmbed
			: new MessageEmbed()
					.setAuthor({ name: "Embed Builder" })
					.setDescription(
						"Welcome to the interactive embed builder. Use the buttons below to build the embed, after click post!"
					);
		let messageContent = null;
		let id = new Date().getTime();
		let row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("author" + id)
					.setLabel("Author Text")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("title" + id)
					.setLabel("Title Text")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("titleurl" + id)
					.setLabel("Title URL")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("description" + id)
					.setLabel("Description Text")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("footer" + id)
					.setLabel("Footer Text")
					.setStyle("SECONDARY")
			);
		let row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("authorimage" + id)
					.setLabel("Author Image")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("thumbnail" + id)
					.setLabel("Thumbnail Image")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("image" + id)
					.setLabel("Large Image")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("footerimage" + id)
					.setLabel("Footer Image")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("color" + id)
					.setLabel("Embed Color")
					.setStyle("SECONDARY")
			);
		let row3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("fields" + id)
					.setStyle("SECONDARY")
					.setLabel("Embed Fields")
			)
			.addComponents(
				new MessageButton()
					.setCustomId(`messagecontent` + id)
					.setStyle("SECONDARY")
					.setLabel("Add message content")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("timestamp" + id)
					.setStyle("SECONDARY")
					.setLabel("Add Timestamp")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("channel" + id)
					.setStyle("PRIMARY")
					.setLabel("Channel to Post")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("post" + id)
					.setStyle("DANGER")
					.setLabel("Post the embed")
			);
		let field;
		let buttons = [row1, row2, row3];
		interaction.reply({
			embeds: [embed],
			components: buttons,
			ephemeral: true,
		});
		const filter = (click) => click.user.id === interaction.member.id;
		const wordFilter = (rep) => {
			return rep.author.id === interaction.member.id;
		};
		const collecter = interaction.channel.createMessageComponentCollector({
			filter,
			time: 900000,
		});
		let channel = interaction.channel;
		let back;
		collecter.on("collect", async function (click) {
			if (click.customId == "messagecontent" + id) {
				click.update({
					content: "What would you like to set the message content to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				messageContent = response.content || null;
				return click.editReply({
					embeds: [embed],
					content: " ",
					components: buttons,
				});
			}
			if (bool == 1 && !preDefinedEmbed) {
				(embed.description = null), (embed.author.name = null);
				bool = 0;
			}
			if (click.customId == "author" + id) {
				click.update({
					content: "What would you like to set the author text to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setAuthor({
						name: response.content,
						iconURL: embed.author.iconURL || null,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "timestamp" + id) {
				try {
					embed.setTimestamp();
				} catch {}
				click.update({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "title" + id) {
				click.update({
					content: "What would you like to set the title text to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setTitle(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "titleurl" + id) {
				click.update({
					content: "What would you like to set the title URL to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				const regex =
					/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
				if (!regex.test(response.content))
					return returnHome(interaction, buttons);
				try {
					embed.setURL(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "description" + id) {
				click.update({
					content: "What would you like to set the description to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setDescription(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "footer" + id) {
				click.update({
					content: "What would you like to set the footer text to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setFooter({
						text: response.content || " ",
						iconURL: embed.footer?.iconURL,
					});
				} catch (e) {
					console.log(e.stack);
				}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "authorimage" + id) {
				click.update({
					content: "What would you like to set the author image to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setAuthor({
						name: embed.author.name,
						iconURL: response.content || response.attachments.first().url,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "color" + id) {
				click.update({
					content: "What color would you like to set the embed to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setColor(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "thumbnail" + id) {
				click.update({
					content: "What would you like to set the thumbnail image to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setThumbnail(
						response.content || response.attachments.first().url
					);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "image" + id) {
				click.update({
					content: "What would you like to set the large image to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setImage(response.content || response.attachments.first().url);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "footerimage" + id) {
				click.update({
					content: "What would you like to set the footer image to?",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				try {
					embed.setFooter({
						text: embed.footer.text || " ",
						iconURL: response.content || response.attachments.first().url,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "channel" + id) {
				click.update({
					content: "What channel would you like to post this to?",
					components: [],
				});
				let msg = await channel.awaitMessages({
					filter: wordFilter,
					max: 1,
					time: 120000,
				});
				let chan;
				if (msg.first().mentions.channels.first()) {
					chan = msg.first().mentions.channels.first();
				} else {
					chan = interaction.member.guild.channels.cache.get(
						msg.first().content
					);
				}
				try {
					msg.first().delete();
				} catch {}
				if (chan) {
					channel = chan;
					buttons[2].components[1].setLabel(chan.name);
				}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "post" + id) {
				click.update({ embeds: [], components: [], content: "Embed Posted !" });
				if (preDefinedEmbed) {
					return messageContent !== null
						? interaction.channel.messages.edit(interaction.targetId, {
								embeds: [embed],
								content: messageContent,
						  })
						: interaction.channel.messages.edit(interaction.targetId, {
								embeds: [embed],
						  });
				} else
					return messageContent !== null
						? channel.send({ content: messageContent, embeds: [embed] })
						: channel.send({ embeds: [embed] });
			} else if (click.customId == "fields" + id) {
				let fieldButtons = await getFieldButtons(embed.fields, id);
				if (fieldButtons.length) {
					fieldButtons[fieldButtons.length - 1].components.push(
						new MessageButton()
							.setCustomId("go-back" + id)
							.setStyle("SUCCESS")
							.setLabel("Go Back")
					);
					fieldButtons[fieldButtons.length - 1].components.push(
						new MessageButton()
							.setCustomId("create-new" + id)
							.setStyle("SUCCESS")
							.setLabel("New Field")
					);
				} else {
					fieldButtons[0] = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId("create-new" + id)
								.setStyle("SUCCESS")
								.setLabel("New Field")
						)
						.addComponents(
							new MessageButton()
								.setCustomId("go-back" + id)
								.setStyle("SUCCESS")
								.setLabel("Go Back")
						);
				}
				click.update({ components: fieldButtons });
				back = "home";
			} else if (click.customId == "create-new" + id) {
				click.update({
					content: "What should the name of this field be?",
					components: [],
				});
				let name = await waitResponse(interaction.channel, wordFilter);
				if (!name) return returnHome(click, buttons);
				click.editReply({ content: "What should the value of this field be?" });
				let value = await waitResponse(interaction.channel, wordFilter);
				if (!value) return returnHome(click, buttons);
				embed.addField(name.content, value.content);
				let fieldButtons = await getFieldButtons(embed.fields, id);
				if (fieldButtons.length) {
					fieldButtons[fieldButtons.length - 1].components.push(
						new MessageButton()
							.setCustomId("go-back" + id)
							.setStyle("SUCCESS")
							.setLabel("Go Back")
					);
					fieldButtons[fieldButtons.length - 1].components.push(
						new MessageButton()
							.setCustomId("create-new" + id)
							.setStyle("SUCCESS")
							.setLabel("New Field")
					);
				} else {
					fieldButtons[0] = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId("create-new" + id)
								.setStyle("SUCCESS")
								.setLabel("New Field")
						)
						.addComponents(
							new MessageButton()
								.setCustomId("go-back" + id)
								.setStyle("SUCCESS")
								.setLabel("Go Back")
						);
				}
				click.editReply({
					content: " ",
					embeds: [embed],
					components: fieldButtons,
				});
				back = "home";
			} else if (click.customId == "go-back" + id) {
				switch (back) {
					case "home":
						returnHome1(click, buttons);
						break;
					case "fields":
						let fieldButtons = await getFieldButtons(embed.fields);
						if (fieldButtons.length) {
							fieldButtons[fieldButtons.length - 1].components.push(
								new MessageButton()
									.setCustomId("go-back" + id)
									.setStyle("SUCCESS")
									.setLabel("Go Back")
							);
							fieldButtons[fieldButtons.length - 1].components.push(
								new MessageButton()
									.setCustomId("create-new" + id)
									.setStyle("SUCCESS")
									.setLabel("New Field")
							);
						} else {
							fieldButtons[0] = new MessageActionRow()
								.addComponents(
									new MessageButton()
										.setCustomId("create-new" + id)
										.setStyle("SUCCESS")
										.setLabel("New Field")
								)
								.addComponents(
									new MessageButton()
										.setCustomId("go-back" + id)
										.setStyle("SUCCESS")
										.setLabel("Go Back")
								);
						}
						click.update({ components: fieldButtons });
						back = "home";
						break;
				}
			} else if (click.customId.startsWith(`edit-field${id}-`)) {
				field = Number(click.customId.split("-")[2]);
				let edits = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId("field-name-" + id)
							.setLabel("Field Name: " + embed.fields[field].name)
							.setStyle("SECONDARY")
					)
					.addComponents(
						new MessageButton()
							.setCustomId("field-value-" + id)
							.setLabel("Field Value")
							.setStyle("SECONDARY")
					);
				if (embed.fields[field].inline == true) {
					edits.addComponents(
						new MessageButton()
							.setCustomId("field-inline-" + id)
							.setLabel("Field Inline")
							.setStyle("SUCCESS")
					);
				} else {
					edits.addComponents(
						new MessageButton()
							.setCustomId("field-inline-" + id)
							.setLabel("Field Inline")
							.setStyle("DANGER")
					);
				}
				click.update({
					components: [
						edits,
						new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId("go-back" + id)
								.setStyle("SUCCESS")
								.setLabel("Go Back")
						),
					],
				});
				back = "fields";
			} else if (
				click.customId.startsWith("field-") &&
				click.customId.endsWith(id)
			) {
				let check = click.customId.split("-")[1];
				let backup = click.message.components;
				if (check == "name") {
					click.update({
						content: "What should the name of this field be?",
						components: [],
					});
					let rep = await waitResponse(interaction.channel, wordFilter);
					if (!rep) return returnHome(click, backup);
					embed.fields[field].name = rep.content;
					backup[0].components[0].setLabel(`Field Name: ${rep.content}`);
					click.editReply({
						content: " ",
						embeds: [embed],
						components: backup,
					});
				} else if (check == "value") {
					click.update({
						content: "What should the value of this field be?",
						components: [],
					});
					let rep = await waitResponse(interaction.channel, wordFilter);
					if (!rep) return returnHome(click, backup);
					embed.fields[field].value = rep.content;
					click.editReply({
						content: " ",
						embeds: [embed],
						components: backup,
					});
				} else if (check == "inline") {
					if (embed.fields[field].inline == true) {
						embed.fields[field].inline = false;
						backup[0].components[2].setStyle("DANGER");
						click.update({ embeds: [embed], components: backup });
					} else {
						embed.fields[field].inline = true;
						backup[0].components[2].setStyle("SUCCESS");
						click.update({ embeds: [embed], components: backup });
					}
				}
			}
		});
	}
}

module.exports = betterDJS;

async function getFieldButtons(fields, id) {
	let array = [];
	let row = new MessageActionRow();
	let limit = 0;
	for (let field of fields) {
		if (row.components.length == 5) {
			array.push(row);
			row = new MessageActionRow();
		}
		row.addComponents(
			new MessageButton()
				.setCustomId(`edit-field${id}-` + limit)
				.setStyle("SECONDARY")
				.setLabel(field.name)
		);
		limit++;
	}
	if (row.components.length) array.push(row);
	return array;
}

async function waitResponse(channel, filter) {
	let msg = await channel.awaitMessages({
		filter: filter,
		max: 1,
		time: 120000,
	});
	try {
		msg.first().delete();
		return msg.first();
	} catch {
		return undefined;
	}
}

function returnHome(interaction, buttons) {
	interaction.editReply({ components: buttons, content: " " });
}

function returnHome1(interaction, buttons) {
	interaction.update({ components: buttons, content: " " });
}
