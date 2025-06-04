import mongoose from "mongoose";

const connectToMongo = async (MONGO_URL) => {
  await mongoose
    .connect(MONGO_URL, {
      dbName: "Trango_Garments",
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Connection error:", err));
};

export default connectToMongo;