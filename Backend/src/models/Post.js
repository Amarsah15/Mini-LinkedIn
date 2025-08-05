import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Content must be at least 10 character long."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
