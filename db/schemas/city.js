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
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("city", citySchema);
