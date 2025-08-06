import { create } from "zustand";
import { axiosInstance } from "../utils/api";
import toast from "react-hot-toast";

export const usePostsStore = create((set, get) => ({
  posts: [],
  isCreatingPost: false,
  isFetchingPosts: false,
  isDeletingPost: false,

  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post("/posts/create", data);

      // Add the new post to the beginning of the posts array
      const currentPosts = get().posts;
      set({ posts: [res.data.post, ...currentPosts] });

      toast.success(res.data.message);
      return res.data.post;
    } catch (error) {
      console.log("Error creating post", error);
      toast.error(error.response?.data?.message || "Error creating post");
      throw error;
    } finally {
      set({ isCreatingPost: false });
    }
  },

  getAllPosts: async () => {
    set({ isFetchingPosts: true });
    try {
      const res = await axiosInstance.get("/posts/getAll");
      set({ posts: res.data.posts });
      return res.data.posts;
    } catch (error) {
      console.log("Error fetching posts", error);
      toast.error(error.response?.data?.message || "Error fetching posts");
      throw error;
    } finally {
      set({ isFetchingPosts: false });
    }
  },

  deletePost: async (postId) => {
    set({ isDeletingPost: true });
    try {
      const res = await axiosInstance.delete(`/posts/${postId}`);

      // Remove the deleted post from the posts array
      const currentPosts = get().posts;
      const updatedPosts = currentPosts.filter((post) => post._id !== postId);
      set({ posts: updatedPosts });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting post", error);
      toast.error(error.response?.data?.message || "Error deleting post");
      throw error;
    } finally {
      set({ isDeletingPost: false });
    }
  },

  getPostsByUserId: async (userId) => {
    try {
      const res = await axiosInstance.get(`/posts/${userId}`);
      return res.data.posts;
    } catch (error) {
      console.log("Error fetching user posts", error);
      toast.error(error.response?.data?.message || "Error fetching user posts");
      throw error;
    }
  },

  // Utility function to clear posts (useful for logout)
  clearPosts: () => {
    set({ posts: [] });
  },
}));
