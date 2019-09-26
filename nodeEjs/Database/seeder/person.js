const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var person = new Schema(
  {
    name: String,
    books:{ type: Schema.Types.ObjectId, ref: 'Book' }
  },
  { collection: "Person" }
);

module.exports = mongoose.model("Person", person);
