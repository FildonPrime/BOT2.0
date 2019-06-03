module.exports = (client, message) => {

    if (message.channel.type === 'dm') return message.reply('Sorry i dont respond to DMs')
    if(message.content.indexOf(">>") !== 0) return;

    const args = message.content.slice(2).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if(!cmd) return;


    cmd.run(client, message, args);

}