const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var book = new Schema(
  {
    bookname: String,
    auther:String,
    price:String,
    personId: { type: Schema.Types.ObjectId, ref: 'Person' },
  },
  { collection: "Book" }
);

module.exports = mongoose.model("Book", book);
