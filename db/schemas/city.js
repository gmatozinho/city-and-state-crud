const mongoose = require("mongoose");
const { Schema } = mongoose;

const citySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    stateId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("city", citySchema);
