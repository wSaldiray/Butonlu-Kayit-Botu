const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  GuildId: String,
  UserId: String,
  TotalRecord: Number,
  WomanRecord: Number,
  ManRecord: Number,
  UserNames: { type: Array, default: [] }
});

module.exports = mongoose.model("Record", Schema);
