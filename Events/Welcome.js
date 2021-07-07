const client = global.client;
const conf = require("../index.json");
const moment = require("moment");
moment.locale("tr");
module.exports.execute = async (member) => {
 
  if(conf.Kayıtsız_Rol){
    await member.roles.add(conf.Kayıtsız_Rol).catch(e => { })
  };
  
  if(conf.WelcomeChannel){
    client.channels.cache.get(conf.WelcomeChannel).send(`
    🎋Merhabalar ${member} aramıza hoş geldin.Seninle beraber sunucumuz **${member.guild.memberCount}** üye sayısına ulaştı.
    
    🔫Hesabın ${moment(member.user.createdAt).format("__YYYY DD MMMM dddd (hh:mm:ss)__")} tarihinde oluşturulmuş.
    
    🎺Sunucumuza kayıt olduktan sonra <#${conf.RulesChannel ? conf.RulesChannel : ""}> kanalına göz atmayı unutma.Kayıt olduktan sonra kuralları okuduğunuzu
    
    kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapıcağız.:tada::tada:
    `)
  };
  
}
  module.exports.conf = {
  event: "guildMemberAdd"
};



