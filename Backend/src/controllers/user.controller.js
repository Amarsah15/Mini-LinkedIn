import User from "../models/User.js";

export const toggleFollow = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // UNFOLLOW
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      // FOLLOW
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      following: !isFollowing,
      followersCount: targetUser.followers.length,
    });
  } catch (error) {
    console.error("Follow toggle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update follow status",
    });
  }
};

export const getFollowStatus = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    res.status(200).json({
      success: true,
      following: isFollowing,
    });
  } catch (error) {
    console.error("Follow status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch follow status",
    });
  }
};
