var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HistorySchema = new Schema({
  couple_key: {
    type: String,
    required: true
  },
  event: {
    type: String,    
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
