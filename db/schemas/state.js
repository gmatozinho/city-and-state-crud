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
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("state", citySchema);
