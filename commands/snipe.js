const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "snipe",
    aliases: ['s', 'snitch'],
    run: async (client, message, args) => {
        const snipes = client.snipes.get(message.channel.id)
        if (!snipes) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription("No deleted message in this channel")
                  .setColor('#303135')
            ]
        })
        const snipe = +args[0] - 1 || 0
        const target = snipes[snipe]
        if(!target) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription(`Only ${snipes.length} message are aviable for sniping`)
                  .setColor('#303135')
            ]
        })
        const { msg, time, image, msg_ref } = target
        if(!msg.content && !msg_ref) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Deleted by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                  .setImage(image)
                  .setFooter({ text: `Sent ${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`})
                  .setColor("#303135")
            ]
        })
        if (!msg.content && msg_ref) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Deleted by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`> ${msg_ref.author}: ${msg_ref.content}`)
                  .setImage(image)
                  .setFooter({ text: `Sent ${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`})
                  .setColor("#303135")
            ]
        })
        if (msg.content && !msg_ref) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Deleted by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription(msg.content)
                  .setImage(image)
                  .setFooter({ text: `Sent ${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`})
                  .setColor("#303135")
            ]
        })
        message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Deleted by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`> ${msg_ref.author}: ${msg_ref.content}\n${msg.content}`)
                  .setImage(image)
                  .setFooter({ text: `Sent ${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`})
                  .setColor("#303135")
            ]
        })
    
    }
}