import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';


const FriendReceive = ({ FriendReceiveList, confirmFriend }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const SearchUserProfile = (email, searchUserId) => {
    navigate(`/user/ordi/searchuserprofile/${email}/${searchUserId}`);
  };
  const displayedFriends = showAll ? FriendReceiveList : FriendReceiveList.slice(0, 8);

  return (
    <div
      className={`w-full pb-1 transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="pt-5 px-1 sm:px-1">
        <h2 className="text-m sm:text-xl font-semibold mb-2">
          Friend Confirm ({FriendReceiveList.length})
        </h2>

        <ul
          className={`divide-y transition-colors ${isDark ? "divide-gray-700" : "divide-gray-200"
            }`}
        >
          {displayedFriends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center py-2 sm:py-3 gap-3"
            >
              <img onClick={() => SearchUserProfile(friend.email, friend.id)}
                className="w-12 h-12 rounded-full object-cover"
                src={`http://localhost:8080/uploads/${friend.profile_URl}`}
                alt={`${friend.name} avatar`}
              />
              <div className="flex-1">
                <h3
                  className={`text-base sm:text-lg font-thin ${isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                >
                  {friend.name}
                </h3>
                
              </div>
              <button onClick={() => confirmFriend(friend.id)} className="mx-1 rounded-2xl bg-blue-500 px-2 py-1.5 sm:px-3 sm:py-2 text-white text-sm sm:text-base transition-all hover:bg-blue-600 focus:bg-blue-400">
                Confirm
              </button>

            </li>
          ))}
        </ul>

        {/* Show All Button */}
        {!showAll && FriendReceiveList.length > 10 && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendReceive;
