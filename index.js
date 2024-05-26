const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/product');
const orderRoutes = require('./src/routes/order');
const saleRoutes = require('./src/routes/sale');
const inventoryRoutes = require('./src/routes/inventory');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dnc-ecommerce')
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Database connection error:', err);
});


app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongodb://localhost:27017/dnc-ecommerce
