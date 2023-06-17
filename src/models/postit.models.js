import mongoose from "mongoose";

const postItSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    enum: ["neutral", "red", "blue", "orange", "green", "yellow", "purple"],
    default: "neutral",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("PostIt", postItSchema);
