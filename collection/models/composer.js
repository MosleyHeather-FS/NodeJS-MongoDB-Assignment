const mongoose = require("mongoose");

const composerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  composer: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Composer", composerSchema);

// Removed the composition populate because it was giving an error in post