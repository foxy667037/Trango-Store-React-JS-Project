import mongoose from "mongoose";
import { Schema } from "mongoose";
import moment from "moment-timezone";

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

const OrderSchema = new Schema({
  orderId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  cartItems: [
    {
      name: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  orderTotal: { type: Number, required: true },
  shippingOption: { type: String, required: true },
  paymentMethod: { type: String, required: true },  
  createdAt: { type: String, default: formatDate },
});

const Orders = mongoose.model("orders", OrderSchema);
export default Orders;