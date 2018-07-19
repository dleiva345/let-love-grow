var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HoneyDoSchema = new Schema({
  couple_key: {
    type: String,
    required: true
  },
  honey_do: {
    type: String,    
    required: true
  }
});

var HoneyDo = mongoose.model("HoneyDo", HoneyDoSchema);
module.exports = HoneyDo;
