const mongoose = require("mongoose");

const composerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Composition",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Composer", composerSchema);

// Throwing error on ref and required under composition. Not sure why.