const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const qtitle = req.query.title;
    if (qtitle) {
      const newprods = await Product.find().lean().exec();
      let filtered = newprods.filter((e) => {
        let Title = e.title.toLowerCase();
        let ntitle = qtitle.toLowerCase();
        if (Title.startsWith(ntitle)) return e;
      });
      return res.status(200).send(filtered);
    }
    const filter = req.query.filter;
    const page = req.query.page || 1;
    const limit = req.query.limit || 8;
    const offset = (page - 1) * 8;
    const pages = Math.ceil((await Product.find().countDocuments()) / limit);
    if (filter == "low") {
      const products = await Product.find()
        .sort({ price: 1 })
        .skip(offset)
        .limit(limit);
      // console.log(lowproducts);
      return res.status(200).send({ products, pages });
    } else if (filter == "high") {
      const products = await Product.find()
        .sort({ price: -1 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send({ products, pages });
    } else if (filter == "rating") {
      const products = await Product.find()
        .sort({ "rating.rate": -1 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send({ products, pages });
    } else if (filter == "latest") {
      const products = await Product.find()
        .sort({ id: 1 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send({ products, pages });
    } else if (filter == "popular") {
      const products = await Product.find()
        .sort({ id: -1 })
        .skip(offset)
        .limit(limit);
      return res.status(200).send({ products, pages });
    }
    const products = await Product.find().skip(offset).limit(limit);
    return res.status(200).send({ products, pages });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
