const { Schema, model } = require("mongoose");

const basketSchema = new Schema(
    {
        plants: [{type: Schema.Types.ObjectId, ref: 'Plant'}],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Basket = model("Basket", basketSchema);

module.exports = Basket;