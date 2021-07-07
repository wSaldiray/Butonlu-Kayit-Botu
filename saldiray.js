const Discord = require("discord.js");
const _client = new Discord.Client({ fetchAllMembers: true });
const client = global.client = _client;
const config = require("./config.json");
const { readdirSync } = require("fs");
const { join } = require("path");
const _function = global.Database = require("./Functions/Database.js");
require("discord-buttons")(_client);

client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "Komutlar")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "Komutlar", `${file}`));
    client.commands.set(command.code, command)
    console.log('[ '+command.code+' ] adlı komut başarıyla çalışıyor.');
}

readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./Events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")} adlı event başarıyla yüklendi.`);
});
  
client.login(config.Token).then(c => console.log(`Logged in as ${client.user.tag}!`)).catch(err => console.error(`Failed to login to the bot!(config.json)`));
const mongoose = require("mongoose");
mongoose.connect(config.MongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(x => { console.log("Mongoo") }).catch(e => { console.error("İnvalid Mongo URL.(config.json)") });
//Lütfen oku.md'yi okumadan geçme!
