const express = require("express");

const router = express.Router();

const Address = require("../models/address.model");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const obj = { ...req.body, user_id: req.user._id };
    const address = await Address.create(obj);
    return res.status(201).send(address);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.params.id });
    return res.status(200).send(addresses);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).send(address);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    return res.status(201).send(address);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
