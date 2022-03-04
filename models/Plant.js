const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
  {
    common_name: String,
    scientific_name: String,
    description: String,
  },
  { 
    timestamps: true
  }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;