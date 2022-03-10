const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        title: String,
        description: String,
        image_url: String,
        date: Date
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Event = model("Event", eventSchema);

module.exports = Event;