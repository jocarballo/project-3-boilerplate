const { Schema, model } = require("mongoose");

const plantSchema = new Schema(
  {
    common_name: String,
    botanical_name: String,
    description: String,
    care: String,
    water_frequency: Object,
    light: String,
    soil: String,
    image: String
  },
  { 
    timestamps: true
  }
);

const Plant = model("Plant", plantSchema);

module.exports = Plant;