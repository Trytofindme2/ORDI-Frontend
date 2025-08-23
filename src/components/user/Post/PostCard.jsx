import React from 'react';
import { Link } from 'react-router-dom';
import PostMenu from './PostMenu';
import HeartIcon from '../icons/HeartIcon';
import CommentIcon from '../icons/CommentIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PostCard = ({ post, postId, userId, isDark, menuOpen, setMenuOpen, onReportClick, onCommentClick, className }) => {
  const getFullImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080/profile-images/${url.replace(/^\/+/, '')}`;
  };

  const getRecipeImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, '')}`;
  };

  return (
    <div className={`rounded-3xl border shadow-md ${isDark ? 'dark:bg-blue-900 border-gray-700' : 'bg-white border-gray-300'} ${className}`}>
      <div className="flex flex-col gap-5 p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={getFullImageURL(post?.userProfileUrl)}
              alt="profile"
              className="w-16 h-16 object-cover rounded-3xl border-2"
            />
            <div>
              <h3>
                <span className="font-semibold">{post.name || 'Anonymous'} </span>
                Shared a recipe.
              </h3>
              <span className="text-gray-500">{dayjs(post.postAt).fromNow()}</span>
            </div>
          </div>

          <PostMenu
            isDark={isDark}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onReport={() => onReportClick(post.id)}
          />
        </div>

        {/* Description */}
        <p>{post.description}</p>

        {/* Recipe image (with preview effect) */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <Link to={`/user/ordi/detail/${post.id}`} className="overflow-hidden rounded-3xl">
            <img
              src={getRecipeImageURL(post.imageUrls[0])}
              alt={post.title}
              className="rounded-3xl w-full object-cover max-h-[400px] transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}

        {/* Actions */}
        <div className={`flex items-center justify-center gap-3 rounded-2xl p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-1 cursor-pointer"><HeartIcon />108</div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={onCommentClick}><CommentIcon />10</div>
          <div className="flex items-center gap-1 cursor-pointer"><BookmarkIcon userId={userId} postId={postId} />5</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
