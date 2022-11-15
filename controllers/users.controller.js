const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    // console.log(req.params.id);
    const user = await User.findById(req.user._id);
    // console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/", authMiddleware, async (req, res) => {
  try {
    // console.log(req.body.address);
    const id = req.user._id;
    item = await User.findByIdAndUpdate(id, req.body);
    return res.status(201).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndDelete(id);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
