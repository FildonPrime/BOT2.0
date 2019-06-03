const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require("enmap");
var sql = require('./sql');


client.webhook = new Discord.WebhookClient('585106094620147732', 'KSXsnbiFFH5WfN45TGSxvR8LPEDhYR9YBIMS1n_F-ieUE_ZsDH8T1rwuBELZsvmHGwi8');
client.webhook.send(`\`\`\`\n[${Number(new Date())}] CONNECTED TO DISCORD API.\n\n[${Number(new Date())}] CONNECTED TO DISCORD WEBHOOK API.\n\n\`\`\``);

sql.setupSqlConnection(client);


client.login("NTg0NzE1MTg2MDkxMzI3NDk4.XPO8-Q.Mn5h2Gtsl7heGX96ke5c8vkpGGo");

//handler EVENT

fs.readdir("./events/", (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading Event : ${eventName}`);
        client.on(eventName, event.bind(null, client));
    })  
})


client.commands = new Enmap();

//handler COMMAND
fs.readdir("./commands/", (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        const props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading Command : ${commandName}`);
        client.commands.set(commandName, props);
    })  
})



