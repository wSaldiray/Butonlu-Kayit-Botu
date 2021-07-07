module.exports = {
  "code": "kayıtsız","aliases": [], async run (client,message,args,conf){
    
    if(!conf.Kayıt_Yetkili_Rol.some(role => message.member.roles.cache.find(x => x.name === role))) return;
 
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send("Kayıtsıza atılacak bir **Üye** belirtmelisin!");
    if(user.user.id === message.author.id) return message.channel.send("Kendini **Kayıtsıza** atamazsın.");
    if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send("Belirtdiğin kişi senden daha yüksek yetkide veya aynı Yetkidesiniz!."); 
 
    await user.setNickname(`${user.user.username}`)
    await user.roles.set(conf.Kayıtsız_Rol);
    message.channel.send("Belirtdiğiniz üye Başarıyla kayıtsıza atıldı.");
}};
