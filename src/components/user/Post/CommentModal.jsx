import React, { useState } from 'react';

const CommentModal = ({ show, isDark, comments, setComments, onClose }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-xl w-11/12 max-w-md ${isDark ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-black'}`}>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
          {comments.map((c, i) => (
            <p key={i} className={`p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>{c}</p>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className={`w-full h-24 p-2 rounded border resize-none mb-3 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        ></textarea>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-full">Close</button>
          <button onClick={handleCommentSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-full">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
