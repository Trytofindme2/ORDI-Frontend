import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Post = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { search } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigation = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await userAPI.get('/getPosts');
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setPosts(response.data.data);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const getFullImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url.startsWith('/') ? '' : '/'}${url}`;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const name = post.name || '';
    const title = post.title || '';
    const description = post.description || '';
    const searchTerm = search.trim().toLowerCase();

    return (
      name.toLowerCase().includes(searchTerm) ||
      title.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div
      className={`min-h-screen px-4 py-6 space-y-6 transition-all duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">🍽️ Recipe Feed</h1>

      {loading ? (
        <p className="text-center text-lg">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-lg">No recipes found.</p>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div 
              onClick={()=> {navigation(`/user/ordi/detail/${post.id}`)}}
              key={post.id}
              className={`flex-1 rounded-3xl border shadow-md transition-all duration-300 ${
                isDark ? 'dark:bg-blue-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
              }`}
            >
              <div className="flex flex-col gap-5 p-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <img
                    src={getFullImageURL(post?.userProfileUrl)}
                    alt=""
                    className="w-16 rounded-full border-2 ring-transparent hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                  />
                  <div className="flex flex-col">
                    <h3>
                      <span className="font-semibold">{post.name || 'Anonymous'} </span>Shared a recipe.
                    </h3>
                    <span className="text-gray-500" title={dayjs(post.postAt).format('YYYY-MM-DD HH:mm')}>
                      {dayjs(post.postAt).fromNow()}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.description}</p>

                {/* Image */}
                <Link to="/postDetails">
                  <img
                    src={post.imageUrls?.[0]}
                    alt={post.title}
                    className="rounded-3xl w-full object-cover max-h-[400px]"
                  />
                </Link>

                {/* Actions */}
                <div
                  className={`flex items-center justify-center gap-3 rounded-2xl p-2 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    <HeartIcon />
                    108
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowComments(true)}>
                    <CommentIcon />
                    10
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <BookmarkIcon />
                    5
                  </div>
                </div>
              </div>

              {/* Comment Modal */}
              {showComments && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div
                    className={`backdrop-blur-md p-6 rounded-lg shadow-xl w-11/12 max-w-md ${
                      isDark ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-black'
                    }`}
                  >
                    <h2 className="text-xl font-bold mb-4">Comments</h2>

                    <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
                      {comments.map((c, i) => (
                        <p
                          key={i}
                          className={`p-3 rounded ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
                        >
                          {c}
                        </p>
                      ))}
                    </div>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className={`w-full h-24 p-2 rounded border resize-none mb-3 transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                          : 'bg-white text-black placeholder-gray-500 border-gray-300'
                      }`}
                    ></textarea>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowComments(false)}
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleCommentSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

// === ICONS ===
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5C14.377 3.75 12.715 4.876 12 6.483 11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3a48.394 48.394 0 0 0-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    />
  </svg>
);
