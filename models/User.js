const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: String,
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    plants: [{type: Schema.Types.ObjectId, ref: 'Plant'}],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
