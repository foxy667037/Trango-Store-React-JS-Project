import mongoose from "mongoose";

const connectToMongo = async (MONGO_URL) => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL, { dbName: "Trango_Garments"});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

export default connectToMongo;