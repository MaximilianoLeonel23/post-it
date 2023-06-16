import mongoose from "mongoose";
const URI = "mongodb://127.0.0.1/post-it-app";

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};
