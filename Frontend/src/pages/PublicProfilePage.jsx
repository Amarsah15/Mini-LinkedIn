import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileCard from "../components/profile/ProfileCard";
import PostCard from "../components/posts/PostCard";

const PublicProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const {
    profile,
    userPosts,
    isFetchingProfile,
    getPublicProfile,
    isFollowing,
    followersCount,
    toggleFollow,
    checkFollowStatus,
  } = useProfileStore();

  useEffect(() => {
    if (userId) {
      getPublicProfile(userId);
      if (authUser) {
        checkFollowStatus(userId);
      }
    }
  }, [userId, authUser, getPublicProfile, checkFollowStatus]);

  if (isFetchingProfile || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleFollow = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    toggleFollow(userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-xl shadow p-6">
          <ProfileCard profile={profile} />

          <div className="flex items-center gap-6 mt-4">
            <span className="text-sm text-gray-600">
              <strong>{followersCount}</strong> Followers
            </span>

            <span className="text-sm text-gray-600">
              <strong>{profile.following?.length || 0}</strong> Following
            </span>
          </div>

          {authUser && authUser._id !== userId && (
            <button
              onClick={handleFollow}
              className={`mt-4 px-5 py-2 rounded-lg font-medium transition ${
                isFollowing
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-linkedin-blue text-white hover:bg-linkedin-darkblue"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Posts */}
        <h2 className="text-xl font-semibold mt-10 mb-4">Posts</h2>

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
