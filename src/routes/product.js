const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while deleting the product' });
  }
});


module.exports = router;
