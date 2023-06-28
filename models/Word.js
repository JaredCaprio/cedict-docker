const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  traditional: {
    type: String,
    required: true,
  },
  simplified: {
    type: String,
    required: true,
  },
  definitions: {
    type: String,
    required: true,
  },
  pronunciation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Word", WordSchema);
