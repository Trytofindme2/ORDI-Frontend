
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import toast, { Toaster } from 'react-hot-toast';
export default function Profile() {
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ✅ track which post is being deleted
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const isDark = theme === "dark";
  const [reload, setReload] = useState(false);
  const getPostImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, "")}`;
  };

  // Fetch user info
  const FetchUserInfo = async () => {
    try {
      const response = await userAPI.get(`findByEmail/${user.email}`);
      if (response.status === 200) {
        const fetchData = response.data.data;
        const normalizedData = { ...fetchData, profileURL: fetchData.profile_URl };
        setData(normalizedData);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch user posts
  const FetchUserPosts = async (userId) => {
    try {
      const response = await userAPI.get(`getOwnPost/${userId}`);
      if (response.status === 200) {
        setPosts(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setData(null);
      setPosts([]);
    } else {
      FetchUserInfo();
      FetchUserPosts(user.id);
    }
  }, [user, reload]);

  const onNavigate = () => {
    navigation("/user/ordi/setting");
  };

  const glassyToastStyle = {
    background: isDark ? 'rgba(40,40,40,0.3)' : 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
    color: isDark ? '#fff' : '#111',
    border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '12px 20px',
    fontWeight: 500,
    textAlign: 'center',
    minWidth: '200px',
  };
  const handleDelete = async (postId) => {
    try {

      const response = await userAPI.post(`/deletePost/${postId}`);
      if (response.status === 200) {
        setConfirmDeleteId(null);
        toast.success('Follower Ban successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting Ban:', error);
      toast.error('Failed to Follower Ban.', { style: glassyToastStyle, position: 'top-center' });
    }

  };

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } p-4 flex flex-col items-center`}>
      <Toaster />
      {/* User Profile Card */}
      <div
        className={`w-full max-w-md ${isDark ? "bg-gray-800 border-gray-600" : "bg-gray-50 border-gray-200"
          } rounded-xl shadow-md overflow-hidden border`}
      >
        <div className="border-b border-gray-300 p-6 text-center">
          <img
            src={
              user.profile_URl
                ? `http://localhost:8080/uploads/${user.profile_URl}`
                : "men/32.jpg"
            }
            alt={"Profile"}
            className="mx-auto h-28 w-28 rounded-full object-cover border-2 border-blue-600"
          />
          <h2 className="mt-4 text-2xl font-semibold">
            {data?.name || "Loading..."}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {data?.address || "No address available"}
          </p>

          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={onNavigate}
              className="bg-blue-600 hover:bg-blue-700 transition px-3 py-2 rounded-md font-semibold text-white"
            >
              Setting
            </button>
            <Link
              to="/user/ordi/friendlist"
              className="bg-gray-300 hover:bg-gray-400 transition px-3 py-2 rounded-md font-semibold text-gray-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Friends&Follow
            </Link>
            <Link
              to="/user/ordi/editProfile"
              className="bg-gray-300 hover:bg-gray-400 transition px-3 py-2 rounded-md font-semibold text-gray-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      {/* User's Own Posts */}
      <div className="mt-8 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer 
    ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                } transition`}
            >
              <Link to={`/user/ordi/detail/${post.id}`} className="overflow-hidden rounded-3xl">
                <img
                  src={getPostImageURL(post.imageUrls[0])}
                  alt={post.title}
                  className="rounded-3xl w-full object-cover max-h-[400px] transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Delete button top-right */}
              <button
                onClick={() => setConfirmDeleteId(post.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Delete
              </button>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No posts yet.
          </p>
        )}
      </div>

      {/* ✅ Floating Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className={`p-6 rounded-xl shadow-lg w-80 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}>
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
