const { Schema, model } = require("mongoose");


const questionSchema = new Schema(
    {
      title: String,
      message: String,
      answer: String
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Question = model("Question", questionSchema);

module.exports = Question;