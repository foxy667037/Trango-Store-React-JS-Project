import express from "express";
import Products from "../../models/Products/Products.js";
import { body, validationResult } from "express-validator";
import fetchUser from "../../middleware/fetchUser.js";
import mongoose from "mongoose";
import multer from "multer";
import cloudinary from "../../db/cloudinary/cloudinary.js";
import moment from "moment-timezone";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({});
const upload = multer({ storage });

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

// route for display 4 recently products: not required authentication
router.get("/recent", async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 }).limit(4); // Sort by creation date
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", err });
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

// route for get all products: require authentication
router.get("/all/products", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await Products.find({ userId });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found. Please add some products." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// route for add an products: require authentication
router.post(
  "/add",
  fetchUser,
  upload.single("file"), // Ensure the frontend sends the file field as "file"
  [
    body("product_name").notEmpty().withMessage("Product name is required"),
    body("product_price")
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Product price must be a number"),
    body("discount")
      .notEmpty()
      .withMessage("Discount is required")
      .isNumeric()
      .withMessage("Discount must be a number")
      .custom((value) => value >= 0 && value <= 100)
      .withMessage("Discount must be between 0 and 100"),
      body("category")
      .notEmpty()
      .withMessage("Category is required")  
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const { product_name, product_price, discount, category } = req.body;
      console.log(req.body);

      // Upload image to Cloudinary
      let product_image_path = "null";
      let product_image_public_id = "null";
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "products", // Optional: folder in Cloudinary
        });
        product_image_path = uploadResult.secure_url; // Get the secure image URL
        product_image_public_id = uploadResult.public_id; // Get the public ID 
      }

      const discounted_price = product_price - (product_price * discount) / 100;

      // Create a new product instance
      const newProduct = new Products({
        product_name,
        product_price,
        product_image_path,
        product_image_public_id,
        discount: `${discount}%`,
        discounted_price,
        category,  
        userId: req.user.id,
      });      

      // Save product to database
      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product added successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);

// route for remove a product:
router.delete("/delete/:productId", fetchUser, async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.product_image_public_id) {
      await cloudinary.uploader.destroy(product.product_image_public_id);
    }

    await Products.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
});

// PUT route to update product details: name, price, and discount
router.put(
  "/update/:productId",
  fetchUser,
  [
    // Validate and sanitize inputs
    body("product_name")
      .notEmpty()
      .withMessage("Product name is required")
      .isString()
      .withMessage("Product name must be a string")
      .trim(),
    body("product_price")
      .notEmpty()
      .withMessage("Product price is required")
      .isFloat({ min: 0 })
      .withMessage("Product price must be a positive number")
      .toFloat(),
    body("discount")
      .notEmpty()
      .withMessage("Discount is required")
      .isInt({ min: 0, max: 100 })
      .withMessage("Discount must be an integer between 0 and 100")
      .toInt(),
  ],
  async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { product_name, product_price, discount } = req.body;

      const discounted_price = product_price - (product_price * discount) / 100;

      product.product_name = product_name;
      product.product_price = product_price;
      product.discount = `${discount}%`;
      product.discounted_price = discounted_price;
      product.updatedAt = formatDate;

      const updatedProduct = await product.save();

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the product" });
    }
  }
);

export default router;