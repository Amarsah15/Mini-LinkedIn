import Post from "../models/Post.js";
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIXED
    const profile = await User.findById(userId).select("-password").populate("posts", "content createdAt");
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    if (!profile) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      profile,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user profile",
      error: err.message,
    });
  }
};
