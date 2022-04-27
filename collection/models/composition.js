const mongoose = require("mongoose");

const compositionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    composer: {
      id: mongoose.Schema.Types.ObjectId,
      ref: "Composer",
      required: true,
    },
    composition: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model("Composition", compositionSchema);