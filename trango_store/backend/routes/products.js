import express from "express";
import Products from "../models/Products.js";
import mongoose from "mongoose";
import { sendEmail } from "../utility/emailService.js";

const router = express.Router();

// route for display new products only 4:
router.get("/recent", async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 }).limit(8);
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// route for display best sold products only 4:
router.get("/best-seller", async (req, res) => {
  try {
    const topProducts  = await Products.find().sort({ productSoldOut: -1 }).limit(8);
    if (!topProducts ) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(topProducts );
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to display product details by product-ID: not required authentication
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to display all products: not require authentication
router.get("/all/products", async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).send(console.log({ msg: error }));
  }
});

// route for fetch casual shirt:
router.get("/all/casual-shirt", async (req, res) => {
  try {
    const products = await Products.find({ category: "Casual Shirt" });
    if (!products) {
      res.status(401).json({msg: "Not Found"});
    }
    res.json(products);
  } catch (error) {
    console.log({ msg: error });
  }
});

// route for fetch dress shirt:
router.get("/all/dress-shirt", async (req, res) => {
  try {
    const products = await Products.find({ category: "Dress Shirt" });
    if (!products) {
      res.status(401).json({msg: "Not Found"});
    }
    res.json(products);
  } catch (error) {
    console.log({ msg: error });
  }
})

export default router;