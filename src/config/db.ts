import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (process.env.MONGO_URL) {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`Successfully connected to MongoDB ${conn.connection.host}`);
    } else {
      throw new Error("Can't find MONGO_URL");
    }
  } catch (err) {
    console.error(`Error in MongoDB ${err}`);
    throw err;
  }
};
