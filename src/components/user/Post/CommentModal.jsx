import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../context/authContext";
import userAPI from "../../../helper/userAPI";
import { useNavigate } from "react-router-dom";

const CommentModal = ({ show, isDark, setComments, selectedPostId, onClose, setPosts }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState(null); // Track which comment is being deleted
  const [deleteEmail, setDeleteEmail] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const glassyToastStyle = {
    background: isDark ? "rgba(40,40,40,0.3)" : "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
    color: isDark ? "#fff" : "#111",
    border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: 500,
    textAlign: "center",
    minWidth: "200px",
  };


  const getComments = async () => {
    try {
      const response = await userAPI.post(`/getComments/${selectedPostId}`);
      if (response.status === 200 && response.data.data) {
        setCommentsList(response.data.data);
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to fetch comments.", { style: glassyToastStyle, position: "top-center" });
    }
  };
  if (selectedPostId) getComments();


  useEffect(() => {
    if (selectedPostId) getComments();
  }, [selectedPostId]);


  const writeComment = async (selectedPostId) => {
    if (!newComment.trim()) return null;
    try {
      const payload = {
        postId: selectedPostId,
        content: newComment,
        commentUserId: user.id,
      };
      const response = await userAPI.post("/addComment", payload);
      if (response.status === 200 && response.data.data) {
        toast.success("Comment added!", { style: glassyToastStyle, position: "top-center" });
        return response.data.data;
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment.", { style: glassyToastStyle, position: "top-center" });
    }
    return null;
  };


  const handleCommentSubmit = async () => {
    const savedComment = await writeComment(selectedPostId);
    if (savedComment) {
      await getComments();  // reload fresh list
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedPostId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post
        )
      );
      setNewComment("");
    }
  };

  const handleDeleteComment = async () => {
    if (!deleteCommentId) return;
    try {
      const response = await userAPI.post(`/deleteComment/${deleteCommentId}`);
      if (response.status === 200) {
        setDeleteEmail(null);
        setDeleteCommentId(null);
        await getComments(); // reload fresh list
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === selectedPostId
              ? { ...post, commentCount: post.commentCount - 1 }
              : post
          )
        );
        toast.success("Comment deleted!", { style: glassyToastStyle, position: "top-center" });
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.", { style: glassyToastStyle, position: "top-center" });
    }
  };



  const SearchUserProfile = (email, searchUserId) => {
    const path = user.email === email
      ? "/user/ordi/profile"
      : `/user/ordi/searchuserprofile/${email}/${searchUserId}`;

    navigate(path);
  };

  const makeDelete = (id, email) => {
    if (email !== user.email) return; // Only allow delete if it's the user's own comment
    setDeleteCommentId(id);
    setDeleteEmail(email);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-xl w-11/12 max-w-md ${isDark ? "bg-gray-800/80 text-white" : "bg-white/80 text-black"}`}>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {deleteCommentId === null &&
          <>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              {commentsList.map((c, index) => (
                <div key={index} className={`flex items-start justify-between space-x-3 p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <div className="flex items-start space-x-3 flex-1" >
                    <img src={`http://localhost:8080/uploads/${c.profile_URl}`}
                      onClick={() => SearchUserProfile(c.email, c.commentUserId)} alt="PF" className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" />
                    <div onClick={() => makeDelete(c.commentId, c.email)}>
                      <h1 className={`text-sm font-semibold mb-1 ${isDark ? "text-gray-100" : "text-gray-800"} truncate`}>{c.name}</h1>
                      <p className="text-sm break-words">{c.content}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className={`w-full h-24 p-2 rounded border resize-none mb-3 ${isDark ? "bg-gray-700 text-white" : "bg-white text-black"}`}
            />
            <div className="flex justify-between">
              <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-full">Close</button>
              <button onClick={handleCommentSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-full">Submit</button>
            </div>
          </>
        }

        {deleteEmail === user.email && (
          <div className={`p-4 rounded-lg mb-4 ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
            <h3 className="text-sm font-bold mb-2">Are you sure you want to delete this comment?</h3>
            <div className="flex justify-end space-x-2">
              <button onClick={() => {
                setDeleteCommentId(null);
                setDeleteEmail(null);
              }
              }
                className="px-3 py-1 rounded bg-gray-400 text-white hover:bg-gray-500" >
                Cancel
              </button>
              <button onClick={handleDeleteComment}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CommentModal;
