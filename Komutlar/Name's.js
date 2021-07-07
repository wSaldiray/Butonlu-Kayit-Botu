module.exports = {
  "code": "isimler","aliases": [""], async run (client,message,args,conf){
   
    if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
 
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const { MessageEmbed } = require("discord.js");
    const Records = require("../Functions/Models/Record.js");
    const Record_ = await Records.findOne({ GuildId: message.guild.id, UserId: user.id });
    
   if(!Record_) {
    var Record = new Records({
      GuildId: message.guild.id,
      UserId: user.id,
      TotalRegister: 0,
      WomanRegister: 0,
      ManRegister: 0,
      UserNames: []
    }).save().then(x => {
      var text = new MessageEmbed().setDescription(`${user} Adlı üyenin ${x.UserNames.length} isim kayıtı bulundu. \n\n${x.UserNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `${conf.Erkek_Rol[0]}`).replace(`Kız Kayıt`, `${conf.Kız_Rol[0]}`)})`)}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
  return message.channel.send(text);
  });
  } else {
    var text = new MessageEmbed().setDescription(`${user} Adlı üyenin ${Record_.UserNames.length} isim kayıtı bulundu. \n\n${Record_.UserNames.map(x => `\`${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `<@&${conf.Erkek_Rol[0]}>`).replace(`Kız Kayıt`, `<@&${conf.Kız_Rol[0]}>`)})`).join("\n ")}`).setFooter("Saldiray ♥️ Neptune").setTimestamp()
   message.channel.send(text);
  };
  
}};
