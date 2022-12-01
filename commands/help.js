const Discord = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['h', 'cmd', 'command'],
    run: async (client, message, args) => {
        const cmdName = args.join(" ")
        if (!cmdName) return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setTitle('Help for ookon')
                  .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          
                  .setDescription('\`\`\`Thanks for inviting our bot to your server! Below is a simple list of commands with what they do and their agruments!\`\`\`\n`,help <cmd_name>`\nshows this message or help command for the command name\n\n`,snipe <position>`\nSnipes deleted messages in a channel\n\n`,editsnipe <position>`\nShows the edited message in a channel\n\n`,rsnipe <position>`\nShows the recently removed reaction')
                  .addFields({ name: '\u200b', value: '\u200b' })
          //.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                  .setTimestamp()
                  .setColor('#303135')
            ]
        })
		if(cmdName === "rsnipe" || cmdName === "rs" || cmdName === "reactionsnipe" || cmdName === "reactsnipe") return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setTitle('Command: reactionsnipe')
                  .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription('Snipe recently removed reaction from a message')
                  .addFields({ name: `Aliases`, value: 'rs, rsnipe, reactsnipe' })
                  .addFields({ name: `Parameters`, value: 'position' })
                  .addFields({ name: `Usage`, value: '\`\`\`Syntax: reactionsnipe <position>\nExample: reactionsnipe 3\`\`\`' })
                  .setTimestamp()
                  .setColor('#303135')
          
           ]   
        })
        if(cmdName === "snipe" || cmdName === "s" || cmdName === "snitch") return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setTitle('Command: snipe')
                  .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription('Snipe deleted messages in a channel')
                  .addFields({ name: `Aliases`, value: 's, snitch' })
                  .addFields({ name: `Parameters`, value: 'position' })
                  .addFields({ name: `Usage`, value: '\`\`\`Syntax: snipe <position>\nExample: snipe 3\`\`\`' })
                  .setTimestamp()
                  .setColor('#303135')
          
           ]   
        })
        if(cmdName === "editsnipe" || cmdName === "es" || cmdName === "esnipe") return message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                  .setTitle('Command: editsnipe')
                  .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                  .setDescription('Snipe edited messages in a channel')
                  .addFields({ name: `Aliases`, value: 'es, editsnipe' })
                  .addFields({ name: `Parameters`, value: 'position' })
                  .addFields({ name: `Usage`, value: '\`\`\`Syntax: editsnipe <position>\nExample: editsnipe 3\`\`\`' })
                  .setTimestamp()
                  .setColor('#303135')
          
            ]   
        })
    }
}
