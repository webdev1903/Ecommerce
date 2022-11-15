const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    promoCode: { type: String },
    discount: { type: String, required: true },
    address: { type: Object },
    status: { type: String, default: "placed", required: true },
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
