import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostsStore } from "../../store/postsStore";
import { useAuthStore } from "../../store/authStore";
import { createPostSchema } from "../../schemas/postSchemas";
import LoadingSpinner from "../common/LoadingSpinner";

const CreatePost = ({ onPostCreated }) => {
  const { authUser } = useAuthStore();
  const { createPost, isCreatingPost } = usePostsStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const content = watch("content", "");

  const onSubmit = async (data) => {
    try {
      await createPost(data);
      reset();
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.log("Failed to create post:", error);
    }
  };

  return (
    <div className="card p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
        <img
          src={
            authUser?.profilePicture ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${
              authUser?.name || "User"
            }`
          }
          alt={authUser?.name || "User"}
          className="w-12 h-12 rounded-full mb-3 sm:mb-0"
        />
        <div className="flex-1 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("content")}
              placeholder="What's on your mind?"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-linkedin-blue focus:border-transparent resize-none min-h-[100px] text-sm sm:text-base ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 space-y-2 sm:space-y-0">
              <span className="text-sm text-gray-500">
                {content.length}/2500 characters
              </span>
              <button
                type="submit"
                disabled={isCreatingPost || content.length < 10}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingPost ? <LoadingSpinner size="sm" /> : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;