module.exports = {
  "code": "kayıt","aliases": ["e","k","erkek","kız"], async run (client,message,args,conf){
  
  const { MessageEmbed } = require("discord.js");
  const { MessageButton , createButtonCollector } = require('discord-buttons');
  const Records = require("../Functions/Models/Record.js");

  if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
  var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!user) return message.channel.send("Kayıt edilecek bir **Kayıtsız Üye** belirtmelisin!");
  if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("Belirtdiğin kişi senden daha yüksek yetkide veya aynı Yetkidesiniz!."); 
  if(user.user.bot) return message.channel.send("Belirtdiğiniz Üye **Bot olduğu** için onu kayıt edemem.");
  if(conf.Yasaklı_Tag.some(yasaktag => user.user.username.includes(yasaktag))) return message.channel.send("Belirtilen üyede **Yasaklı Tag** bulunmakta olduğu için kayıt olması Yasaktır!");
  
  args = args.filter(a => a !== "" && a !== " ").splice(1);
  var name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
  if(!name) return message.channel.send("Kayıt edilecek üyenin **İsmini belirtmedin!**");
  var age = args.filter(arg => !isNaN(arg))[0] || undefined;
  if(!age) return message.channel.send("Kayıt edilecek üyenin **Yaşını belirtmedin!**");
 
  if(conf.Erkek_Rol.some(role => user.roles.cache.has(role)) || conf.Kız_Rol.some(role => user.roles.cache.has(role))) return message.channel.send("Belirtilen üye zaten **Kayıt Edilmiş**.");
  if(name.length + age.length >= 25) return message.channel.send("İsim ve Yaş toplam uzunluğu en fazla **25 karakterden** oluşmalıdır!");
 
  var ManRecord = new MessageButton()
  .setLabel("Erkek").setStyle("blurple").setEmoji("♂️").setID("#Man_Record");
    
  var WomanRecord = new MessageButton()
  .setLabel("Kız").setStyle("red").setEmoji("♀️").setID("#Woman_Record");
  
  var text = new MessageEmbed().setAuthor(message.author.username,message.author.avatarURL()).setDescription("<@"+user.id+"> **adlı kullanıcının kayıt işlemi için aşağıdaki butonlardan seçim yapın.**").setFooter("İşlem 20 saniye sonra iptal edilicektir.");         
    
  var realname = `${user.user.username.includes(conf.Tag[0]) ? conf.Tag[0] : (conf.Tag2 ? conf.Tag2 : (conf.Tag[0] || ""))} ${name} | ${age}`;
  var m =  await message.channel.send({buttons: [ ManRecord, WomanRecord ], embed: text});
  var filter = (button) => button.clicker.user.id === message.author.id;
  var collector = await m.createButtonCollector(filter, { time: 20000 })

  collector.on("collect", async (button) => {
   if(button.id === "#Man_Record"){
   
   user.setNickname(`${realname}`).catch(e => { message.reply("İsim değiştirilemedi! (sanırım bir sorun oluştu)")});
   user.roles.add(conf.Erkek_Rol).catch(e => { })
   global.Database.SaveRecord(message.guild.id,message.author.id,"Man");
   global.Database.SaveRecord_(message.guild.id,user.id,realname,"Erkek Kayıt")
   
   if(m){m.delete();} 
   message.react("✅").catch(e => { });
   const Record_ = await Records.findOne({ GuildId: message.guild.id, UserId: user.id });
    
   if(!Record_) {
    var Record = new Records({GuildId: message.guild.id,UserId: user.id,TotalRegister: 0,WomanRegister: 0,ManRegister: 0,UserNames: []}).save().then(x => {
    var text = new MessageEmbed().setDescription(`<@${user.id}> adlı kullanıcı başarıyla Erkek olarak kayıt edildi. \n\n ${user} Adlı üyenin ${x.UserNames.length} isim kayıtı bulundu. \n\n${x.UserNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `${conf.Erkek_Rol[0]}`).replace(`Kız Kayıt`, `${conf.Kız_Rol[0]}`)})`)}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
  return message.channel.send(text).then(msg => msg.delete({timeout: 8000}));
  });
  } else {
    var text = new MessageEmbed().setDescription(`<@${user.id}> adlı kullanıcı başarıyla Erkek olarak kayıt edildi. \n\n ${user} Adlı üyenin ${Record_.UserNames.length} isim kayıtı bulundu. \n\n${Record_.UserNames.map(x => `\`${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `<@&${conf.Erkek_Rol[0]}>`).replace(`Kız Kayıt`, `<@&${conf.Kız_Rol[0]}>`)})`).join("\n ")}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
   message.channel.send(text).then(msg => msg.delete({timeout: 8000}));
   };
 };
    
  if(button.id === "#Woman_Record"){
  
   user.setNickname(`${realname}`).catch(e => { message.reply("İsim değiştirilemedi! (sanırım bir sorun oluştu)")});
   user.roles.add(conf.Kız_Rol).catch(e => { })
   global.Database.SaveRecord(message.guild.id,message.author.id,"Woman");
   global.Database.SaveRecord_(message.guild.id,user.id,realname,"Kız Kayıt")
  
   if(m){m.delete();} 
   message.react("✅").catch(e => { });
   const Record_ = await Records.findOne({ GuildId: message.guild.id, UserId: user.id });
    
   if(!Record_) {
    var Record = new Records({GuildId: message.guild.id,UserId: user.id,TotalRegister: 0,WomanRegister: 0,ManRegister: 0,UserNames: []}).save().then(x => {
    var text = new MessageEmbed().setDescription(`<@${user.id}> adlı kullanıcı başarıyla Kadın olarak kayıt edildi. \n\n ${user} Adlı üyenin ${x.UserNames.length} isim kayıtı bulundu. \n\n${x.UserNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `${conf.Erkek_Rol[0]}`).replace(`Kız Kayıt`, `${conf.Kız_Rol[0]}`)})`)}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
  return message.channel.send(text).then(msg => msg.delete({timeout: 3000}));
  });
  } else {
    var text = new MessageEmbed().setDescription(`<@${user.id}> adlı kullanıcı başarıyla Kadın olarak kayıt edildi. \n\n ${user} Adlı üyenin ${Record_.UserNames.length} isim kayıtı bulundu. \n\n${Record_.UserNames.map(x => `\`${x.nick}\` (${x.type.replace(`Erkek Kayıt`, `<@&${conf.Erkek_Rol[0]}>`).replace(`Kız Kayıt`, `<@&${conf.Kız_Rol[0]}>`)})`).join("\n ")}`).setFooter(`${conf.İnfo[0]} ♥️ ${conf.İnfo[1]}`).setTimestamp()
   message.channel.send(text).then(msg => msg.delete({timeout: 3000}));
   };
 };
 })
    
 }};
