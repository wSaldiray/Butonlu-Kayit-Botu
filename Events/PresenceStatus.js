const conf = require("../index.json");
const client = global.client;

exports.execute = async () => {
  client.user.setPresence({ activity: { name: `♥️Saldiray Butonlu Kayıt Botu`}, status: "dnd" });
  var BotChannel = client.channels.cache.get(conf.BotChannel);
  if (BotChannel) BotChannel.join().then(c => console.log(`Successfully connected to the voice channel ${BotChannel.name}!`)).catch(err => console.error(`Could not connect to voice channel!`));
};

exports.conf = {
  event: "ready"
};
