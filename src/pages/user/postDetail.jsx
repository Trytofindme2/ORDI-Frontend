import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import userAPI from "../../helper/userAPI";
import ImageGallery from "../../components/user/postDetail/ImageGallery";
import VideoPlayer from "../../components/user/postDetail/VideoPlayer";

const PostDetail = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Recipe not found</p>;

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.description}</p>

      {/* Images */}
      <ImageGallery images={post.imageUrls} />

      {/* Video */}
      <VideoPlayer videoUrl={post.videoUrl} />

      {/* Ingredients */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside">
          {post.ingredients.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <p>Prep Time: {post.preparationTime} mins | Cook Time: {post.cookingTime} mins</p>
    </div>
  );
};

export default PostDetail;
