const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
      name: { type: String, required: true },
      mobile: { type: Number, required: true },
      address_line_1: { type: String, required: true },
      address_line_2: { type: String, required: true },
      landmark: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("address", addressSchema);
