const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "rsnipe",
    aliases: ['rs', 'reactionsnipe', 'reactsnipe'],
    run: async (client, message, args) => {
        const rsnipes = client.rsnipes.get(message.channel.id)
        if (!rsnipes) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription("No reaction removed")
                  .setColor('#303135')
            ]
        })
        const rsnipe = +args[0] - 1 || 0
        const target = rsnipes[rsnipe]
        if(!target) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription(`Only ${rsnipes.length} reactions are aviable for sniping`)
                  .setColor('#303135')
            ]
        })
        const { reaction, msg, time, user } = target
        message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Reacted by ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                  .setDescription(`${msg.content}\n> ${reaction}`)
                  .setFooter({ text: `Reacted ${moment(time).fromNow()} | ${rsnipe + 1}/${rsnipes.length}`})
            ]
        })
    }
}