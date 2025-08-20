import React from 'react';
import { Link } from 'react-router-dom';
import PostMenu from './PostMenu';
import HeartIcon from '../icons/hearticon';
import CommentIcon from '../icons/CommentIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PostCard = ({ post, postId , userId ,isDark, menuOpen, setMenuOpen, onReportClick, onCommentClick }) => {
  const getFullImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div className={`rounded-3xl border shadow-md ${isDark ? 'dark:bg-blue-900 border-gray-700' : 'bg-white border-gray-300'}`}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={getFullImageURL(post?.userProfileUrl)}
              alt=""
              className="w-16 rounded-full border-2"
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

        <p>{post.description}</p>

        <Link to={`/user/ordi/detail/${post.id}`}>
          <img
            src={post.imageUrls?.[0]}
            alt={post.title}
            className="rounded-3xl w-full object-cover max-h-[400px]"
          />
        </Link>

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
