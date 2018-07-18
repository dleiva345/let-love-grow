var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CalendarSchema = new Schema({
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
  },
  time: {
    type: Date,
    required: true
  }
});

var Calendar = mongoose.model("Calendar", CalendarSchema);
module.exports = Calendar;
