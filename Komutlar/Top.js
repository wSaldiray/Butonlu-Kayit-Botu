module.exports = {
  "code": "topteyit","aliases": [""], async run (client,message,args,conf){
  
  if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
  
  const { MessageEmbed } = require("discord.js");
  const Records = require("../Functions/Models/Record.js");
  var Record_ = await Records.find({ GuildId: message.guild.id }).sort({ TotalRecord: -1 }).exec();
  const text = new MessageEmbed().setAuthor(message.author.username,message.author.avatarURL()).setDescription(`Merhaba ${message.author}, **"${message.guild.name}"** sunucusuna ait **Teyit Bilgisi** bulunamadı`) .setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp();
  if(!Record_.length) return message.channel.send(text)
  Record_ = Record_.filter(x => message.guild.members.cache.has(x.UserId) && x.TotalRecord !== undefined && x.TotalRecord !== 0).splice(0, 10)
   
  const embed = new MessageEmbed().setAuthor(message.author.username,message.author.avatarURL()).setDescription(`Merhaba ${message.author}, İşte **"${message.guild.name}"** Sunucusunun **__"Top 10"__** Teyit listesi; \n\n ${Record_.map((x, i) => `(\`#${i+1}\`) <@${x.UserId}> [\`Toplam: ${x.TotalRecord}\` (\`Erkek: ${x.ManRecord} ,Kadın ${x.WomanRecord}\`)]`).join("\n")}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp();
  message.channel.send(embed);
}};
