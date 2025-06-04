import mongoose from "mongoose";
import { Schema } from "mongoose";
import moment from "moment-timezone";

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

const productsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_image_path: {
    type: String,
    default: "null",
  },
  product_image_public_id: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  discounted_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Dress Shirt", "Casual Shirt"], 
  },  
  productSoldOut: {
    type: Number,
    default: () => Math.floor(Math.random() * 100) + 1, 
  },
  createdAt: {
    type: String,
    default: formatDate,
  },
  updatedAt: {
    type: String,
    default: "null",
  },
});

const Products = mongoose.model("products", productsSchema);
export default Products;