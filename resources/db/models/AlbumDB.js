var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AlbumSchema = new Schema({
  couple_key: {
    type: String,
    required: true
  },
  photo_link: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  descr: {
    type: String
  }
});

var Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
