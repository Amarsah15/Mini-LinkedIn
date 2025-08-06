import React from "react";
import CreatePost from "../components/posts/CreatePost";
import PostFeed from "../components/posts/PostFeed";

const HomePage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-2xl mx-auto px-4 py-8">
      <CreatePost />
      <PostFeed />
    </div>
  </div>
);

export default HomePage;
