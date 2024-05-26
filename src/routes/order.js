const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const router = express.Router();

router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { products } = req.body;

    for (let i = 0; i < products.length; i++) {
      const product = await Product.findOne({ id: products[i].productId }).session(session);
      if (!product || product.stockQuantity < products[i].quantity) {
        throw new Error('Product not available or insufficient quantity');
      }

      product.stockQuantity -= products[i].quantity;
      await product.save({ session });
    }

    const order = new Order(req.body);
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).send(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
