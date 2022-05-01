const mongoose = require("mongoose");

const composerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  composition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Composition",
    required: true,
  },
  composer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Composer", composerSchema);