import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import userAPI from "../../helper/userAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const getRecipeImageURL = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:8080/${url.replace(/^\/+/, "")}`;
};

const getProfileImageURL = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `http://localhost:8080/profile-images/${url.replace(/^\/+/, "")}`;
};

const SavePost = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDark = theme === "dark";

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await userAPI.get(`savePostList/${user.id}`);
        if (response.status === 200) {
          console.log(response.data.data);
          setSavedPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPosts();
  }, [user.id]);

  const handleUnsave = async (postId, savePostId) => {
    try {
      const response = await userAPI.delete(
        `/unsavePost?postId=${postId}&userId=${user.id}`
      );
      if (response.status === 200) {
        setSavedPosts((prev) =>
          prev.filter((post) => post.savePostId !== savePostId)
        );
      }
    } catch (error) {
      console.error("Error unsaving post:", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-darkblue-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 flex items-center gap-4 px-5 py-3 shadow ${
          isDark ? "bg-darkblue-900" : "bg-white"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-darkblue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Saved Posts</h1>
      </header>

      {/* Main */}
      <main className="p-4">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading saved posts...
          </p>
        ) : savedPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No saved posts yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedPosts.map((post) => (
              <div
                key={post.savePostId}
                className={`rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isDark ? "bg-darkblue-800" : "bg-white"
                }`}
              >
                {/* Image */}
                {post.imageUrls?.length > 0 && (
                  <img
                    src={getRecipeImageURL(post.imageUrls[0])}
                    alt={post.title}
                    className="w-full h-44 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Title */}
                  <h2 className="text-lg font-bold tracking-wide">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-3">
                    {post.authorProfileUrl ? (
                      <img
                        src={getProfileImageURL(post.authorProfileUrl)}
                        alt={post.authorName}
                        className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-darkblue-700"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-darkblue-700" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {post.authorName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-red-500 text-white">
                      {post.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-pink-500 dark:bg-darkblue-700 text-white">
                      ⏱ Prep: {post.preparationTime} min
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500 dark:bg-darkblue-700 text-white">
                      🍳 Cook: {post.cookingTime} min
                    </span>
                  </div>

                  {/* Unsave button */}
                  <button
                    onClick={() => handleUnsave(post.postId, post.savePostId)}
                    className="mt-3 px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    Unsave
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavePost;
