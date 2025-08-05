import Post from "../models/Post.js";
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIXED
    const profile = await User.findById(userId).select("-password");
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    if (!profile) return res.status(404).json({ message: "User not found" });

    if (!posts) return res.status(404).json({ message: "Posts not found" });
    if (posts.length === 0)
      return res.status(200).json({
        success: true,
        profile,
        message: "No posts found for this user",
      });

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
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
