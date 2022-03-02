const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
  {
    common_name: String,
    scientific_name: String,
    description: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;