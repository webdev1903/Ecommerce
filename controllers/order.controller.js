const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const Order = require("../models/order.model");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/razorpay", authMiddleware, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const payment_capture = 1;
    const amount = Number(req.body.amount);
    console.log(amount, req.body.amount);
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture,
    };
    const response = await razorpay.orders.create(options);

    return res.json({
      id: response.id,
      currency: "INR",
      amount: response.amount,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/razorpay/success", authMiddleware, async (req, res) => {
  try {
    const obj = { ...req.body, userId: req.user._id };
    // req.body.userId = req.user._id;
    const order = await Order.create(obj);
    return res.send("success");
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/success/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).send("Invalid");
    } else {
      return res.status(200).send("order-success");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const obj = { ...req.body, user_id: req.user._id };
    const order = await Order.create(obj);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("", authMiddleware, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.body.user_id }).populate(
      "products.product_id"
    );
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
