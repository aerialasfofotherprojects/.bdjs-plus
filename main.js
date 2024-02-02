(function (window) {
    const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages
        ],
     });

    let prefix;

    const bdjsPlus = {
        version: '0.0.1',
        createBot: function createBot(token, botPrefix) {
            try {
            client.once(Events.ClientReady, readyClient => {
                console.log(`Logged into ${readyClient.user.tag} and ready to run.`);
            })
            client.login(token);
            prefix = botPrefix;
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        intents: function intents(intentsArray) {
            const discordIntents = [];

            try {
            intentsArray.forEach(intent => {
                discordIntents.push(GatewayIntentBits[intent]);
            });

            client.options.intents = discordIntents;
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        }, // Objects
        ctx: {
            message: message = (item) => {
                const message = {
                    content: message.content,
                    arguments: message.content.slice(prefix.length).trim().split(/ +/),
                    trigger: message.content.slice(prefix.length).trim().split(/ +/)[0]
                };
                
                return message[item];
            }
        },
        setResponse: function setResponse(messageContent) {
            let channelId = client.channels.cache.get('channel_id');

            try {
            channelId.send(messageContent);
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        setEmbedResponse: function setEmbedResponse(color, title, author, authorIcon, addField, inline, fieldValue, footer) {
            try {
            let embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: title, iconUrl: authorIcon })
                .setDescription(author)
                .addFields({ name: addField, value: fieldValue, inline: inline })
                .setFooter({ text: footer });
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        ban: function ban(userId) {
            let user = userId;

            try {
            guild.members.ban(user);
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        unban: function unban(userId) {
            let user = userId;

            try {
            guild.members.unban(user);
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        banWithReason: function banWithReason(userId, reason) {
            let user = userId;
            let reason = reason;

            try {
            if (user) {
                user.ban({ reason: reason});
            }
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        kick: function kick(userId) {
            let user = userId;
            try {
            if (user) {
                user.kick();
            }
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        kickWithReason: function banWithReason(userId, reason) {
            let user = userId;
            let reason = reason;

            try {
            if (user) {
                user.kick(reason);
            }
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        botTyping: function botTyping() {
            message.channel.sendTyping();
        },
        createChannel: function createChannel(name, type) {
            let channelName = name;
            let channelType = type;
            
            try {
            function compareTextVoice(item1, item2) {
                if (item1 === item2) {
                    if (item2 == 'text') {
                        return 'GUILD_TEXT';
                    } else if (item2 == 'voice') {
                        return 'GUILD_VOICE';
                    }
                }
            }

            let usableChannelType = compareTextVoice(channelType, 'text');

            if (usableChannelType == undefined || null) {
                let usableChannelType = compareTextVoice(channelType, 'voice');
            }

            if (channelName && usableChannelType) {
                guild.channels.create();
            }
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
        removeChannel: function removeChannel(channelId) {
            try {
                let channel = channelId;
                
                channel.delete();
            } catch {
                console.error(`BDJS: ${error.type} ${error.name}`);
            }
        },
    }
    // Expose the library to the global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = bdjsPlus;
    } else {
        window.bdjsPlus = bdjsPlus;
    }
})(window || global);