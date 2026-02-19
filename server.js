
// =======================================
// SIMPLE REST API DEMO (Beginner Level)
// Everything in ONE file for easy learning
// =======================================

   // REST API Server for CRUD Operations
   const express = require('express');
const mongoose = require('mongoose');

// 2️⃣ Create Express app
const app = express();
const PORT = 5000;

// 3️⃣ Middleware (Very Important)
// This allows us to read JSON data from request body
app.use(express.json());

// 4️⃣ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/simpledb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// 5️⃣ Create Schema (Structure of data)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

// 6️⃣ Create Model (Connects to collection)
const Product = mongoose.model('Product', productSchema);

// 7️⃣ Home Route
app.get('/', (req, res) => {
    res.send("Simple REST API is Running");
});

// ===============================
// CRUD ROUTES
// ===============================

// 🔵 CREATE Product
app.post('/products', async (req, res) => {
    const product = new Product(req.body);   // Create object
    await product.save();                    // Save in database
    res.json(product);                       // Send response
});

// 🔵 READ All Products
app.get('/products', async (req, res) => {
    const products = await Product.find();   // Get all data
    res.json(products);
});

// 🔵 READ Single Product
app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// 🔵 UPDATE Product
app.put('/products/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// 🔵 DELETE Product
app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
});

// 8️⃣ Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
