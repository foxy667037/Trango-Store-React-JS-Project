import mongoose from "mongoose";
import { Schema } from "mongoose";
import moment from "moment-timezone";

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

const bannerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true, 
    },
    banner_title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    banner_description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    display_banner: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: String,
      default: formatDate,
    },
    updatedAt: {
      type: String,
      default: formatDate,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("banner", bannerSchema);
export default Banner;
