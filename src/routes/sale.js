const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const sale = new Sale({
    productId: req.body.productId,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice
  });
  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
