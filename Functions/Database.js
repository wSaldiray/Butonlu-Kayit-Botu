  const Records = require("../Functions/Models/Record.js");
  
class DataBase {
  
  static async SaveRecord(GuildID, UserID, Type){
    var Record = await Records.findOne({ GuildId: GuildID, UserId: UserID });
  
    if(!Record){
    let Record_ = new Records({GuildId: GuildID,UserId: UserID,TotalRecord: 1,WomanRecord: Type === "Woman" ? 1 : 0,ManRecord: Type === "Man" ? 1 : 0,UserNames: []}).save(); 
  } else {
    Record.TotalRecord++
    Record.ManRecord++
    Record.save();
 };
};
  
  static async SaveRecord_(GuildID, UserID, Nick, Type){
    var Record = await Records.findOne({ GuildId: GuildID, UserId: UserID });

    if(!Record){
    let Record_ = new Records({GuildId: GuildID,UserId: UserID,TotalRecord: 0,WomanRecord: 0,ManRecord: 0,UserNames: [{nick: Nick,type: Type}]}).save(); 
  } else {
    Record.UserNames.push({nick: Nick, type: Type})
    Record.save();
  }
  };
 
}
module.exports = DataBase
