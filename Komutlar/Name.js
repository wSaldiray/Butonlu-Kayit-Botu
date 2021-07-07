module.exports = {
  "code": "isim","aliases": [], async run (client,message,args,conf,data){
    
    if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
 
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.reply("Lütfen bir kullanıcı etiketleyiniz veya ID belirtiniz");
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.reply("Belirtdiğin kişi senden üstün veya onunla aynı yetkidesin!."); 
  
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    var name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    if(!name) return message.channel.send("İsmi değiştirilecek üyenin **İsmini belirtmedin!**");
    var age = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!age) return message.channel.send("İsmi değiştirilecek üyenin **Yaşını belirtmedin!**");
 
    var realname = `${user.user.username.includes(conf.Tag) ? conf.Tag : (conf.Tag2 ? conf.Tag2 : (conf.Tag || ""))} ${name} | ${age}`;
    global.Database.SaveRecord_(message.guild.id,user.id,realname,"İsim Degiştirme")
    user.setNickname(`${realname}`);
    message.channel.send({embed:{description: `${message.guild.emojis.cache.find(x => x.name === "onayla" || "✅")} \`${realname}\` adlı üyenin ismi Başarıyla değiştirildi.`}});
    message.react(message.guild.emojis.cache.find(x => x.name === "onayla") || "✅");
}};
