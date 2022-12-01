# SnipeBot---Discord.js

A Snipebot made with the discord.js library that can snipe unlimited messages in a channel!

**Table of Contents**
1. Installations
2. Running Bot
3. Discord.js and more
4. To Do

## Installations
- Install discord.js: `npm i discord.js`
- Install moment: `npm i moment`

---
> Make sure you have all intents turned on for your bot on 
discord developer portal.
>

## Running Bot
```JSON
{
    "prefix": "your prefix",
    "token": "your bot token"
}
```
Paste your prefix and bot token
then on console type `node index.js`

## Discord.js and more

- Read the [Discord.js Docs](https://discord.js.org/#/)
- In this repository I used discord.js `messageDelete`, `messageReactionRemove`and `messageUpdate` events and by using discord.js [Collections](https://discord.js.org/#/docs/discord.js/main/search?query=collections) I was able to store all the deleted messages.

## To Do:
1. Add more commands,
2. If a message has embed, snipe the embed description
   
