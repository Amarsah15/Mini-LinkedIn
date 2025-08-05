import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      content,
      author: userId,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: err.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: "AllPosts fetched", posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: err.message,
    });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ fix: use id instead of destructuring userId
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      posts,
      success: true,
      message: `${req.user.name} posts fetched successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user's posts",
      error: err.message,
    });
  }
};
