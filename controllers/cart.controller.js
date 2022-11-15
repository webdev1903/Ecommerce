const express = require("express");

const router = express.Router();
const Cart = require("../models/cart.model");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const obj = { ...req.body, user_id: req.user._id };
    const cart = await Cart.create(obj);
    return res.status(201).send(cart);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.user._id }).populate(
      "product_id"
    );
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("product_id");
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.deleteMany({ user_id: req.user._id });
    return res.status(201).send(cart);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id).populate(
      "product_id"
    );
    return res.status(201).send(cart);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
