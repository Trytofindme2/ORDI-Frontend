import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import userAPI from "../../helper/userAPI";
import ImageGallery from "../../components/user/postDetail/ImageGallery";
import VideoPlayer from "../../components/user/postDetail/VideoPlayer";
import RecipeIngredients from "../../components/user/postDetail/RecipeIngredients";

const PostDetail = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const BackButton = () => window.history.back();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await userAPI.get(`getPostDetail/${id}`);
        setPost(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className={`p-8 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading...
      </div>
    );

  if (!post)
    return (
      <div className={`p-8 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Recipe not found
      </div>
    );

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Fixed Video Card */}
      <div className={`sticky top-4 flex justify-center z-10`}>
        <div className={`rounded-lg shadow-lg w-full max-w-md mx-4 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <VideoPlayer videoUrl={post.videoUrl} fixedWidth="100%" fixedHeight="220px" />

          <div className="p-4">
            <h5 className="text-xl font-semibold mb-2">{post.title}</h5>
            <p className="text-sm mb-4">{post.description}</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={BackButton}
                className="flex-1 px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-xs uppercase shadow-md text-white transition"
              >
                Back
              </button>
              {/* <button
                className="flex-1 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-xs uppercase shadow-md text-white transition"
              >
                Order
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mt-4 px-4 pb-10 space-y-6">
        {/* Horizontal Image Gallery */}
        <ImageGallery images={post.imageUrls} isHorizontal />

        {/* Ingredients */}
        <RecipeIngredients 
          ingredients={post.ingredients} 
          preparationTime={post.preparationTime} 
          cookingTime={post.cookingTime} 
          difficulty={post.difficulty} 
        />
      </div>
    </div>
  );
};

export default PostDetail;
