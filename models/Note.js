const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
      text: String,
      watered: Boolean,
      soil_changed: Boolean,
      plant: {type: Schema.Types.ObjectId, ref: 'Plant'},
      user: {type: Schema.Types.ObjectId, ref: 'User'} 
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Note = model("Note", noteSchema);

module.exports = Note;