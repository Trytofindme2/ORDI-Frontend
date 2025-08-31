import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostMenu from './PostMenu';
import HeartIcon from '../icons/HeartIcon';
import CommentIcon from '../icons/CommentIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthContext } from '../../../context/authContext';
dayjs.extend(relativeTime);

const PostCard = ({ FriendList, onReactionClick, onShareClick, addFollow, unFollow, showMenu, post, postId, userId, isDark, menuOpen, setMenuOpen, onReportClick, onCommentClick, className, addFriend, commentcount, reactioncount }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getRecipeImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, '')}`;
  };

  const SearchUserProfile = (email, searchUserId) => {
    const path = user.email === email
      ? "/user/ordi/profile"
      : `/user/ordi/searchuserprofile/${email}/${searchUserId}`;

    navigate(path);
  };


  return (
    <div className={`rounded-3xl border shadow-md ${isDark ? 'dark:bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} ${className}`}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => SearchUserProfile(post.useremail, post.userId)}>
            <img
              src={`http://localhost:8080/uploads/${post.userProfileUrl}`}
              alt={post.userProfileUrl}
              className="w-12 h-12 rounded-full object-cover object-cover rounded-3xl border-2"
            />
            <div>
              <h4>
                <span className="font-semibold">{post.name || 'Anonymous'} </span>
                Shared a recipe.
              </h4>
              <span className="text-gray-500">{dayjs(post.postAt).fromNow()}</span>
            </div>
          </div>

          {showMenu && (
            <PostMenu
              isDark={isDark}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onReport={() => onReportClick(postId)}
              addFriend={addFriend}
              addFollow={addFollow}
              unFollow={unFollow}
              FriendList={FriendList}
              friendstatus={post.friendstatus}
              followstatus={post.followstatus}
              friendrequeststatus={post.friendrequeststatus}
              sharePost={(receiverEmail) => onShareClick(receiverEmail, postId)} // ✅ Pass up
              postId={postId}
            />
          )}
        </div>

        <p>{post.description}</p>
        {post.imageUrls && post.imageUrls.length > 0 && (
          <Link to={`/user/ordi/detail/${post.id}`} className="overflow-hidden rounded-3xl">
            <img
              src={getRecipeImageURL(post.imageUrls[0])}
              alt={post.title}
              className="rounded-3xl w-full object-cover max-h-[400px] transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}

        <div className={`flex items-center justify-center gap-3 rounded-2xl p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => onReactionClick(post.id)}><HeartIcon />{reactioncount ?? 0}</div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => onCommentClick(post.id)}><CommentIcon />{commentcount ?? 0}</div>
          <div className="flex items-center gap-1 cursor-pointer"><BookmarkIcon userId={userId} postId={postId} /></div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
