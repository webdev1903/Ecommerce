const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
