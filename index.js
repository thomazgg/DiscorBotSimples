const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

let config = require('./settings/config.json');

const client = new Discord.Client({
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER"],
    restTimeOffset: 0,
    intents: 513,

});

client.on("ready", () => {
    console.log(`${client.user.username} is Online`);
    client.user.setActivity(`${config.prefix}help || thomaz is coding me...`)
})

client.on("messageCreate", (message) => {

    let prefix = config.prefix

    if (!message.guild) return
    if (message.author.bot) return
    if (message.channel.partial) return
    if (message.partial) return

    let args = message.content.slice(prefix.length).trim().split(/ +/)
    let cmd = args.shift()?.toLowerCase();


    // ping
    if (message.mentions.has(client.user)) {
        let mentionprefix = new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setDescription(`___Vc me pingou ...___ **Meu prefixo eh \`${prefix}\` **`)
        return message.channel.send({ embeds: [mentionprefix] })
    }
    // prefix
    if (cmd.length > 0) {
        switch (cmd) {
            case "ping":
                message.reply(`>>> \`${client.ws.ping}\`ms`);
                break;
            case "say":
                message.channel.send(`>>> ${args.join(" ")}`);
                break;
            case "av":
                let embedav = new Discord.MessageEmbed()
                    .setImage(message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter(`Coded by \`@thomazgg\``)
                message.reply({ embeds: [embedav] })
                break;
            case "ee":
                // embed
                let embed = new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(`Opa eu sou uma **Embed**`)
                    .setFooter(`fui progamador por \`@thomazgg\``, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp(Date.now())
                message.reply({ embeds: [embed] })
                break;
            default:
                message.reply(`:x: Comando invalido`)
                break;
        }
    }
})

client.login(config.token);