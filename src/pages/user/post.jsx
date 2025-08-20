import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import PostCard from '../../components/user/Post/PostCard';
import ReportModal from '../../components/user/Post/ReportModal';
import CommentModal from '../../components/user/Post/CommentModal';

const Post = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { search } = useOutletContext();

  const { user } = useContext(AuthContext)

  console.log(user.id);
  
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openPostMenuId, setOpenPostMenuId] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await userAPI.get('/getPosts');
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
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

  const handleReportSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); 
      if (!user || !user.id) {
        console.error('User not found in localStorage');
        return;
      }

      const data = {
        reportReason,
        receipe: selectedPostId,
        reportedBy: user.id 
      };

      const response = await userAPI.post('/submitReport', data); 
      if (response.status === 200) {
        console.log('Successfully reported');
        setReportReason('');
        setShowReportModal(false);
        setShowComments(false);
        setOpenPostMenuId(null); 
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-6 space-y-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">🍽️ Recipe Feed</h1>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            postId={post.id}
            userId={user.id}
            isDark={isDark}
            menuOpen={openPostMenuId === post.id}
            setMenuOpen={(isOpen) =>
              setOpenPostMenuId(isOpen ? post.id : null)
            }
            onReportClick={(id) => {
              setSelectedPostId(id);
              setShowReportModal(true);
            }}
            onCommentClick={() => setShowComments(true)}
          />
        ))
      )}

      <ReportModal
        show={showReportModal}
        isDark={isDark}
        reason={reportReason}
        setReason={setReportReason}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />

      <CommentModal
        show={showComments}
        isDark={isDark}
        comments={comments}
        setComments={setComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
};

export default Post;
