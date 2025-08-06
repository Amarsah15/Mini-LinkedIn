import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProfileCard from "../components/profile/ProfileCard";
import EditProfile from "../components/profile/EditProfile";
import PostCard from "../components/posts/PostCard";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const {
    profile,
    userPosts,
    isFetchingProfile,
    getUserProfile,
    removeUserPost,
  } = useProfileStore();

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  if (isFetchingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  const displayProfile = profile || authUser;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* --------------- PROFILE HEADER --------------- */}
        {editing ? (
          <EditProfile
            profile={displayProfile}
            onProfileUpdated={() => setEditing(false)}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="relative">
            <ProfileCard
              profile={displayProfile}
              postsCount={userPosts.length}
            />
            <button
              onClick={() => setEditing(true)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-linkedin-blue transition-colors"
              title="Edit profile"
            >
              ✎
            </button>
          </div>
        )}
        {/* ---------------- USER POSTS ---------------- */}
        <h2 className="text-xl font-semibold mt-8 mb-4">My Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostDeleted={removeUserPost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
