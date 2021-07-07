const Discord = require("discord.js");
const client = global.client;
const conf = require ('../index.json');
exports.execute = async (message) => {
  
  if(message.author.bot) return;
  if(message.content.startsWith(conf.prefix)) {
    const args = message.content.slice(conf.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    var cmd = client.commands.get(command) || client.commands.array().find((x) => x.aliases && x.aliases.includes(command));    
    if(!cmd) return message.channel.send(`Komut dosyamda **${command}** adlı bir komut bulamadım.`);
    try { cmd.run(client, message, args, conf); } catch (error){ console.error(error); }
    
 }};
exports.conf = {
  event: "message"
};





