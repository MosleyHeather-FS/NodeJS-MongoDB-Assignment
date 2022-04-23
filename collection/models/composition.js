const mongoose = require("mongoose");

const compositionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    composer: String
});

module.exports = mongoose.model("Composition", compositionSchema);