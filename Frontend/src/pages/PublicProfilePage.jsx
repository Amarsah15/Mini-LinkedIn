import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileCard from "../components/profile/ProfileCard";
import PostCard from "../components/posts/PostCard";

const PublicProfilePage = () => {
  const { userId } = useParams();
  const { authUser } = useAuthStore();
  const { profile, userPosts, isFetchingProfile, getPublicProfile } =
    useProfileStore();

  // Redirect if user clicks own profile
  if (authUser?._id === userId) {
    return <Navigate to="/profile" />;
  }

  useEffect(() => {
    getPublicProfile(userId);
  }, [userId, getPublicProfile]);

  if (isFetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileCard profile={profile} postsCount={userPosts.length} />

        <h2 className="text-xl font-semibold mt-8 mb-4">Posts</h2>

        {userPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          userPosts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default PublicProfilePage;
