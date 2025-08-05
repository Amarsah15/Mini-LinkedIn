import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Content must be at least 10 character long."],
      maxlength: [2500, "Content must not exceed 2500 characters."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
