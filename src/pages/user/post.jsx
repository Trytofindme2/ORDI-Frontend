import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import PostCard from '../../components/user/Post/PostCard';
import ReportModal from '../../components/user/Post/ReportModal';
import CommentModal from '../../components/user/Post/CommentModal';
import toast, { Toaster } from 'react-hot-toast';
import { WebSocketContext } from '../../WebSocketContext';
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
  const [comments, setComments] = useState([]);
  const [FriendList, setFriend] = useState([]);
  const { connectWebSocket, stompClient } = useContext(WebSocketContext);

  useEffect(() => {
    if (!user) return;
    fetchPosts();
    fetchFriends();
  }, [user]);
  const fetchPosts = async () => {
    try {
      const res = await userAPI.post(`/getPosts/${user.id}`);
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await userAPI.post(`/getFriendList/${user.id}`);
      if (res.status === 200 && res.data.data) {
        const data = res.data.data;
        setFriend(data.friends || []);
       
      } else {
        console.warn("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

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

  const addFriend = async (userId) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: userId
      };
      const response = await userAPI.post('/addFriend', data);
      if (response.status === 200) {
        toast.success('Add Friend successfully!', { style: glassyToastStyle, position: 'top-center' });
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report.', { style: glassyToastStyle, position: 'top-center' });
    }
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

  const addFollow = async (userId) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: userId
      };
      const response = await userAPI.post('/addFollow', data);
      if (response.status === 200) {
        toast.success('Follow successfully!', { style: glassyToastStyle, position: 'top-center' });
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to follow.', { style: glassyToastStyle, position: 'top-center' });
    }
  }

  const addReaction = async (postId) => {
    try {
      const data = { addUserId: user.id, receiveUserId: postId };
      const response = await userAPI.post("/addReaction", data);
      if (response.status === 200) {
        const action = response.data.data.action; // "added" or "removed"
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                reactionCount:
                  action === "added"
                    ? post. reactionCount + 1
                    : Math.max(0, post. reactionCount - 1),
              };
            }
            return post;
          })
        );
        toast.success(
          action === "added"
            ? "Reaction added successfully!"
            : "Reaction removed successfully!",
          { style: glassyToastStyle, position: "top-center" }
        );
      }
    } catch (error) {
      console.error("Error submitting reaction:", error);
      toast.error("Failed to react.", { style: glassyToastStyle, position: "top-center" });
    }
  };
  const unFollow = async (followingid) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: followingid
      };
      const response = await userAPI.post('/makeUnFollow', data);
      if (response.status === 200) {
        toast.success('UnFollow successfully!', { style: glassyToastStyle, position: 'top-center' });

      }
    } catch (error) {
      console.error('Error submitting UnFollow:', error);
      toast.error('Failed to UnFollow.', { style: glassyToastStyle, position: 'top-center' });
    }
  }

  const [showComments, setShowComments] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedCommentPostId, setSelectedCommentPostId] = useState(null);
  const onShareClick = (receiverEmail, postId) => {
    connectWebSocket(user.email, onConnected, onError, onPrivateMessage);
    const now = new Date();
    const localDateTime = now.toISOString().slice(0, 19);
    const chatMessage = {
      senderEmail: user.email,
      receiverEmail: receiverEmail,
      status: "MESSAGE",
      datetime: localDateTime,
      receipeId: postId
    };
    setTimeout(() => {
      if (stompClient.current && stompClient.current.send) {
        stompClient.current.send("/app/private-message", {}, JSON.stringify(chatMessage));
      } else {
        console.error("WebSocket client not connected.");
      }
    }, 100);

  }

  const onError = (err) => console.error("WebSocket error:", err);
  const onConnected = (client) => {
    client.send(
      "/app/message",
      {},
      JSON.stringify({ senderName: user.email, status: "JOIN" })
    );
  };

  const onPrivateMessage = (payloadData) => {
    const normalizedMessage = {
      ...payloadData,
      textContent: payloadData.textContent || payloadData.message,
    };
    if (
      normalizedMessage.senderEmail === user.email ||
      normalizedMessage.receiverEmail === user.email
    ) {
      setMessages((prev) => [...prev, normalizedMessage]);
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
              FriendList={FriendList}
              postId={post.id}
              userId={user.id}
              isDark={isDark}
              menuOpen={openPostMenuId === post.id}
              setMenuOpen={(isOpen) => setOpenPostMenuId(isOpen ? post.id : null)}
              onReportClick={(id) => {
                setSelectedPostId(id);
                setShowReportModal(true);
              }}
              onReactionClick={() => addReaction(post.id)}
              onCommentClick={() => {
                setSelectedCommentPostId(post.id);
                setShowComments(true);
              }}
              onShareClick={onShareClick}
              commentcount={post.commentCount}
              reactioncount={post.reactionCount}
              firstImage={firstImage}
              className={index === 0 ? 'mt-4' : 'mt-2'}
              addFollow={() => addFollow(post.userId)}
              addFriend={() => addFriend(post.userId)}
              unFollow={() => unFollow(post.userId)}
              showMenu={post.userId !== user.id} // ✅ add this prop
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
        setPosts={setPosts}
        setComments={setComments}
        selectedPostId={selectedCommentPostId}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
};

export default Post;
