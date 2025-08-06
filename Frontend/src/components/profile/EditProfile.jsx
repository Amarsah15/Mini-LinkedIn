import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { updateProfileSchema } from "../../schemas/profileSchemas";
import LoadingSpinner from "../common/LoadingSpinner";

const EditProfile = ({ onProfileUpdated, onCancel }) => {
  /* ------------------------------------------------------------ */
  /* 1.  User data already hydrated from the http-only cookie      */
  /* ------------------------------------------------------------ */
  const { authUser } = useAuthStore(); // basic info
  const {
    profile, // full profile (may include bio)
    updateProfile,
    isUpdatingProfile,
  } = useProfileStore();

  /* Prefer the full profile if we have it, otherwise fall back to authUser */
  const initial = profile || authUser;

  /* ------------------------------------------------------------ */
  /* 2.  Form setup                                               */
  /* ------------------------------------------------------------ */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: initial?.name ?? "",
      bio: initial?.bio ?? "",
    },
  });

  const bio = watch("bio", "");

  /* ------------------------------------------------------------ */
  /* 3.  Submit handler                                           */
  /* ------------------------------------------------------------ */
  const onSubmit = async (data) => {
    try {
      const updatedUser = await updateProfile(data); // toast + state handled in store
      if (onProfileUpdated) onProfileUpdated(updatedUser);
    } catch (err) {
      // store already showed a toast; just log for dev
      console.error("Profile update failed:", err);
    }
  };

  /* ------------------------------------------------------------ */
  /* 4.  Render                                                   */
  /* ------------------------------------------------------------ */
  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* -------------------------- Name -------------------------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            className={`input-field ${errors.name ? "border-red-500" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* --------------------------- Bio -------------------------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            {...register("bio")}
            className={`input-field resize-none ${
              errors.bio ? "border-red-500" : ""
            }`}
            rows="3"
            placeholder="Tell us about yourself..."
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {bio.length}/160 characters
          </div>
        </div>

        {/* ------------------------ Actions ------------------------- */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isUpdatingProfile}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingProfile ? <LoadingSpinner size="sm" /> : "Save Changes"}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
