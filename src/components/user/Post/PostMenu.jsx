import React, { useState } from "react";

const PostMenu = ({
  isDark,
  menuOpen,
  friendstatus,
  followstatus,
  friendrequeststatus,
  setMenuOpen,
  onReport,
  addFriend,
  addFollow,
  unFollow,
  FriendList,
  sharePost,
   postId 
}) => {
  const [showShareBox, setShowShareBox] = useState(false);

  const toggleShareBox = () => {
    setShowShareBox(!showShareBox);
    console.log(FriendList);

  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ⋮
        </button>
        {menuOpen && (
          <div
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
          >
            <ul>
              {/* ✅ Report */}
              <li
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={onReport}
              >
                Report to Admin
              </li>

              {/* ✅ Follow / Unfollow */}
              {followstatus ? (
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={unFollow}
                >
                  UnFollow
                </li>
              ) : (
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={addFollow}
                >
                  Follow User
                </li>
              )}

              {/* ✅ Friend logic */}
              {!friendstatus && !friendrequeststatus && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={addFriend}
                >
                  Add Friend
                </li>
              )}

              {/* ✅ Share */}
              <li
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={toggleShareBox}
              >
                Share Post
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Floating Share Box */}
      {showShareBox && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className={`rounded-lg shadow-lg w-80 max-h-96 flex flex-col ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
          >
            {/* ✅ Header inside modal */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="font-semibold text-lg">Share with Friends</h2>
              <button
                className="text-xl font-bold hover:text-red-500"
                onClick={() => setShowShareBox(false)}
              >
                ✕
              </button>
            </div>

            {/* ✅ Friend List scrollable */}
            <ul className="divide-y overflow-y-auto">
              {FriendList && FriendList.length > 0 ? (
                FriendList.map((friend, index) => (
                  <div
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:8080/uploads/${friend.profile_URl}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 object-cover"
                      />
                      <h4>{friend.name || "Anonymous"}</h4>
                    </div>

                    <button onClick={()=>sharePost(friend.email)}  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                      Share
                    </button>
                  </div>

                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No friends to share with</li>
              )}
            </ul>
          </div>
        </div>
      )}

    </>
  );
};

export default PostMenu;

