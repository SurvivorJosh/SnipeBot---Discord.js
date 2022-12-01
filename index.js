const moment = require('moment')

const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMessageReactions
    ],
	partials: [
	    Discord.Partials.Message, 
		Discord.Partials.Channel, 
		Discord.Partials.Reaction
	]
})
const fs = require('fs')
const config = require('./config.json')

client.config = require('./config.json')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.snipes = new Discord.Collection()
client.esnipes = new Discord.Collection()
client.rsnipes = new Discord.Collection()


fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('Could not find any commands!')
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})


client.on('ready', () => {
    console.log(`${client.user.tag} is ready `)
    client.user.setPresence({ activities: [{ name: `${config.prefix}help`, type: Discord.ActivityType.Competing }], status: 'idle', })
})

client.on('messageReactionRemove', async(reaction, user) => {
    if(user == client.user) return
    let rsnipes = client.rsnipes.get(reaction.message.channel.id) || []
    rsnipes.unshift({
        reaction: reaction.emoji,
        msg: reaction.message,
        time: Date.now(),
        user: user,
    
    })
    client.rsnipes.set(reaction.message.channel.id, rsnipes)
})

client.on('messageUpdate', async(oldMes, newMes) => {
    let esnipes = client.esnipes.get(oldMes.channel.id) || []
  
    esnipes.unshift({
        msg: oldMes,
        newc: newMes,
        author: oldMes.author,
        time: Date.now()
    })
    client.esnipes.set(oldMes.channel.id, esnipes)
})

client.on('messageDelete', async(message) => {
    if(message.author == client.user) return 
  
    let snipes = client.snipes.get(message.channel.id) || []
    let repliedTo

    try{
        repliedTo = await message.channel.messages.fetch(message.reference.messageId).catch((err) => console.log("OK"))
    }
    catch(e) {
    
    }

 
    snipes.unshift({
        msg: message || null,
        msg_ref: repliedTo || null,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now()
    })
    client.snipes.set(message.channel.id, snipes)
})

client.on('messageCreate', async message => {

    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send({
	        embeds: [
                new Discord.EmbedBuilder()
                  .setDescription(`You must be in a voice channel!`)
                  .setColor('BLURPLE')
            ]
        })
    }
  
 
 
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
    
    }
 })


client.login(config.token)
