var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HoneyDoSchema = new Schema({
  couple_key: {
    type: String,
    required: true
  },
  task: {
    type: String,    
    required: true
  },
  assigned_to: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  }
});

var HoneyDo = mongoose.model("HoneyDo", HoneyDoSchema);
module.exports = HoneyDo;
