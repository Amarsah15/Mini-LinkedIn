import React, { useEffect } from "react";
import { usePostsStore } from "../store/postsStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PostCard from "../components/posts/PostCard";
import { useProfileStore } from "../store/profileStore";
import { useAuthStore } from "../store/authStore";

const PostsPage = () => {
  const { authUser } = useAuthStore();
  const { profile, getUserProfile } = useProfileStore();
  const { posts, isFetchingPosts, getAllPosts } = usePostsStore();

  useEffect(() => {
    getAllPosts(), getUserProfile();
  }, [getAllPosts, getUserProfile]);

  if (isFetchingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  const displayProfile = profile || authUser;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts available.</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} profile={displayProfile} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostsPage;
