const express = require('express');
const Inventory = require('../models/inventory');
const Product = require('../models/product');
const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findOne({ id: req.params.productId });
    if (!product) {
      return res.status(404).send('Product not found');
    }

    product.stockQuantity = quantity;
    await product.save();

    const inventory = await Inventory.findOneAndUpdate(
      { productId: req.params.productId },
      { quantity, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).send(inventory);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).send(inventory);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
