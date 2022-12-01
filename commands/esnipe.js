const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "esnipe",
    aliases: ['es', 'editsnipe'],
    run: async (client, message, args) => {
        const esnipes = client.esnipes.get(message.channel.id)
        if (!esnipes) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription("No edited messages in this server")
                  .setColor('#303135')
            ]
        })
        const esnipe = +args[0] - 1 || 0
        const target = esnipes[esnipe]
        if(!target) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setDescription(`Only ${esnipes.length} message are aviable for sniping`)
                  .setColor('#303135')
            ]
        })
        const { newc, msg, time } = target
        message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setAuthor({ name: `Edited by ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({ dynamic: true }) })
                  .addFields({ name: 'Unedited', value: msg.content })

                  .addFields({ name: 'Edited', value: newc.content })

                  .setFooter({ text: `Edited ${moment(time).fromNow()} | ${esnipe + 1}/${esnipes.length}`})
                  .setColor("#303135")
            ]
        })
    }
}