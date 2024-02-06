(function (window) {
    const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent
        ]
    });

    let prefix;
    let discordMessage;

    client.on(Events.MessageCreate, (receivedMessage) => {
        discordMessage = receivedMessage;
        let message = {
            content: receivedMessage.content,
            arguments: receivedMessage.content.slice(prefix.length).trim().split(/ +/),
            trigger: receivedMessage.content.slice(prefix.length).trim().split(/ +/)[0],
            guild: receivedMessage.guild,
            channel: {
                id: receivedMessage.channel.id
            }
        }
        console.log(`Message received in ${message.guild.name}, ${message.channel.id}`)
    });

    const bdjs = {
        version: '0.0.1',
        createBot: function createBot(token, botPrefix) {
            try {
                client.once(Events.ClientReady, readyClient => {
                    console.log(`Logged into ${readyClient.user.tag} and ready to run.`);
                })
                client.login(token);
                prefix = botPrefix.toString();
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        newSlashCommand: async function createSlashCommand(guildId, commandData, commandCallback) {
            try {
                const command = await client.guilds.cache.get(guildId)?.commands.create(commandData);
                console.log(`Slash command ${command.name} created successfully.`);

                client.on(Events.InteractionCreate, async interaction => {
                    if (!interaction.isCommand() || interaction.commandName !== commandData.name) return;
                    await commandCallback();
                });
            } catch (error) {
                console.error(`Error creating slash command: ${error}`);
            }
        }
    };

    const commands = {
        setResponse: async function setResponse(messageContent) {
            try {
                await discordMessage.channel.send(messageContent);
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        setEmbedResponse: async function setEmbedResponse(color, title, author, authorIcon, addField, inline, fieldValue, footer) {
            try {
                let embed = new EmbedBuilder()
                    .setColor(color)
                    .setAuthor({ name: title, iconUrl: authorIcon })
                    .setDescription(author)
                    .addFields({ name: addField, value: fieldValue, inline: inline })
                    .setFooter({ text: footer });

                await discordMessage.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        ban: async function ban(userId) {
            let user = userId;

            try {
                await discordMessage.guild.members.ban(user);
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        unban: async function unban(userId) {
            let user = userId;

            try {
                await discordMessage.guild.members.unban(user);
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        banWithReason: async function banWithReason(userId, reason) {
            let user = userId;
            let banReason = reason;

            try {
                await user.ban({ reason: banReason });
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        kick: async function kick(userId) {
            let user = userId;

            try {
                await discordMessage.guild.members.kick(user);
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        kickWithReason: async function kickWithReason(userId, reason) {
            let user = userId;
            let kickReason = reason;

            try {
                await user.kick(kickReason);
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        botTyping: async function botTyping() {
            try {
                await discordMessage.channel.sendTyping();
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        createChannel: async function createChannel(name, type) {
            let channelName = name;
            let channelType = type;

            try {
                function compareTextVoice(item) {
                    return item === 'text' ? 'GUILD_TEXT' : item === 'voice' ? 'GUILD_VOICE' : null;
                }

                let usableChannelType = compareTextVoice(channelType);

                if (usableChannelType == undefined || usableChannelType == null) {
                    usableChannelType = compareTextVoice(channelType);
                }

                if (channelName && usableChannelType) {
                    try {
                        const channel = await discordMessage.guild.channels.create(channelName, { type: usableChannelType });
                        console.log(`Channel created: ${channel.name}, type: ${channel.type}`);
                    } catch (error) {
                        console.error(`BDJS: ${error.name} - ${error.message}`);
                    }
                }
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        },
        removeChannel: async function removeChannel(channelId) {
            try {
                const channel = await discordMessage.guild.channels.cache.get(channelId);
                if (channel) {
                    await channel.delete();
                    console.log(`Channel deleted: ${channel.name}`);
                }
            } catch (error) {
                console.error(`BDJS: ${error.name} - ${error.message}`);
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { bdjs, commands };
    } else {
        window.bdjs = bdjs;
        window.commands = commands;
    }
})(typeof window !== 'undefined' ? window : global);
