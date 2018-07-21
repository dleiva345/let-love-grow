var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MoodSchema = new Schema({
  couple_key: {
    type: String,
    required: true
  },
  email: {
    type: String,    
    required: true
  },
  mood: {
    type: String,    
    required: true
  }
});

var Mood = mongoose.model("Mood", MoodSchema);
module.exports = Mood;
