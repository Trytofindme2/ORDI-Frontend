import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import PostCard from '../../components/user/Post/PostCard';
import ReportModal from '../../components/user/Post/ReportModal';
import CommentModal from '../../components/user/Post/CommentModal';
import toast, { Toaster } from 'react-hot-toast';

const Post = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { search } = useOutletContext();
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openPostMenuId, setOpenPostMenuId] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
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

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      toast.error('Please enter a reason.', { style: glassyToastStyle, position: 'top-center' });
      return;
    }

    try {
      const data = {
        reportReason,
        receipe: selectedPostId,
        reportedBy: user.id,
      };

      const response = await userAPI.post('/submitReport', data);
      if (response.status === 200) {
        toast.success('Report submitted successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReportReason('');
        setShowReportModal(false);
        setShowComments(false);
        setOpenPostMenuId(null);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report.', { style: glassyToastStyle, position: 'top-center' });
    }
  };

  return (
    <div className={`min-h-screen px-4 py-6 space-y-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Toaster />
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        filteredPosts.map((post, index) => {
          const firstImage = post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls[0] : null;

          return (
            <PostCard
              key={post.id}
              post={post}
              postId={post.id}
              userId={user.id}
              isDark={isDark}
              menuOpen={openPostMenuId === post.id}
              setMenuOpen={(isOpen) => setOpenPostMenuId(isOpen ? post.id : null)}
              onReportClick={(id) => {
                setSelectedPostId(id);
                setShowReportModal(true);
              }}
              onCommentClick={() => setShowComments(true)}
              firstImage={firstImage} // pass first image
              className={index === 0 ? 'mt-4' : 'mt-2'}
            />
          );
        })
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
