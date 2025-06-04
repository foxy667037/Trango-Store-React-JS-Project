import mongoose from "mongoose";
const { Schema } = mongoose;
import moment from "moment-timezone";

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

// Schema for User
const UserSchema = new Schema({
  googleId: { type: String, default: null },
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, default:null },
  verifyStatus: { type: String, default: "pending" },
  SignInWith: { type: String, default: "" },
  created_at: { type: String, default: formatDate },
  verified_at: { type: String, default: "" },
  login_at: { type: String, default: "" },
  photoURL: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

export default User;
