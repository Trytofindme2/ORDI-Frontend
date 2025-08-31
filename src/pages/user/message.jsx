import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { AuthContext } from '../../context/authContext';
import userAPI from '../../helper/userAPI';
import { ThemeContext } from '../../context/themeContext';
import { WebSocketContext } from '../../WebSocketContext';

const MessageList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [Friends, setFriend] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const fetchFriends = async () => {
     if (!user) return;
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
  useEffect(() => {
    fetchFriends();
  }, [user]);

  const handleMessageClick = (friendId) => {
    navigate(`/user/ordi/conversation/${friendId}`);
  };

  return (
    <div className="max-w-md mx-auto mt-3 px-2">
      <h1 className="text-2xl font-bold text-center mb-4 `${isDark ? 'text-gray-100' : 'text-gray-800'}`">
        Messages
      </h1>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {Friends.map((friend) => (
          <li
            key={friend.id}
            onClick={() => handleMessageClick(friend.id)}
            className="flex items-center justify-between py-3 px-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={`http://localhost:8080/uploads/${friend.profile_URl}`}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
              <div className="flex flex-col">
                <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {friend.name}
                </h3>
                
                <span className="text-gray-500 dark:text-gray-400 text-sm truncate w-48">
                  {friend.latest}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-400 dark:text-gray-500 text-xs">{friend.time}</span>
              <FiChevronRight className="text-gray-400 dark:text-gray-500 mt-1" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
