const mongoose = require("mongoose");
const { Schema } = mongoose;

const stateSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    abbreviation: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("state", stateSchema);
