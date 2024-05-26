const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
