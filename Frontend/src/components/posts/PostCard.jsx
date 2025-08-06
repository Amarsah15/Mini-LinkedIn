import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePostsStore } from "../../store/postsStore";
import { useAuthStore } from "../../store/authStore";

const PostCard = ({ post, onPostDeleted }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { deletePost } = usePostsStore();

  const isOwner = authUser && post.author._id === authUser._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deletePost(post._id);
      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      console.log("Failed to delete post:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleNameClick = (clickedUserId) => {
    if (!authUser) return;
    if (authUser._id === clickedUserId) {
      navigate("/profile");
    } else {
      navigate(`/profile/${clickedUserId}`);
    }
  };

  return (
    <div className="card p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* Profile Picture (Clickable) */}
          <img
            src={
              post.author.profilePicture ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${post.author.name}`
            }
            alt={post.author.name}
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={() => handleNameClick(post.author._id)}
          />

          {/* Name + Timestamp */}
          <div>
            <div className="flex items-center space-x-2">
              <h3
                className="font-semibold text-gray-900 cursor-pointer hover:underline"
                onClick={() => handleNameClick(post.author._id)}
              >
                {post.author.name}
              </h3>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Delete (If Owner) */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete post"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
