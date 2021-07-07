module.exports = {
  "code": "teyitbilgi","aliases": [], async run (client,message,args,conf,data){
   
    if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
   
    const { MessageEmbed } = require("discord.js");
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const Records = require("../Functions/Models/Record.js");
    var Record_ = await Records.findOne({ GuildId: message.guild.id, UserId: user.id});
  
    if(!Record_) {
    var Record = new Records({GuildId: message.guild.id,UserId: user.id,TotalRecord: 0,WomanRecord: 0,ManRecord: 0,UserNames: []}).save().then(x => {
    var text = new MessageEmbed().setAuthor(message.author.username,message.author.avatarURL()).setDescription(`<@${user.id}> adlı Kullanıcıya ait **Teyit Bilgisi** bulunamadı!`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
      message.channel.send(text);
    });
  } else {
   var text = new MessageEmbed().setAuthor(message.author.username,message.author.avatarURL())
   .addField(`❯ Kullanıcı Bilgisi`, `
\`»\` Hesap: ${user} 
\`»\` Sunucudaki İsmi: ${message.guild.member(user).displayName ? message.guild.member(user).displayName : user.username} 
\`»\` Kullanıcı ID: ${user.id}`)
   .addField(`❯ Kayıt Bilgisi`, `
\`»\` Toplam: ${Record_.TotalRecord} 
\`»\` Erkek: ${Record_.ManRecord} 
\`»\` Kız: ${Record_.WomanRecord}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp().setThumbnail(user.avatarURL())
   message.channel.send(text)
  }
 
}};
