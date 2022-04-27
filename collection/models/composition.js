const mongoose = require("mongoose");

const compositionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    composer: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model("Composition", compositionSchema);