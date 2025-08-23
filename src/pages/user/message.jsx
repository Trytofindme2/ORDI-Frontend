import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const messages = [
  {
    id: 1,
    name: 'Emily Jones',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    latest: 'Hey! Are you joining the recipe group?',
    time: '10:45 AM',
  },
  {
    id: 2,
    name: 'Lucas Ramirez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    latest: 'I just uploaded a new cooking video!',
    time: '9:30 AM',
  },
  {
    id: 3,
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    latest: 'Loved your last post!',
    time: 'Yesterday',
  },
  {
    id: 4,
    name: 'Arjun Patel',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    latest: 'Can you share the recipe?',
    time: '2 days ago',
  },
];

const MessageList = () => {
  const navigate = useNavigate();

  const handleMessageClick = (friendId) => {
    navigate(`/user/ordi/conversation/${friendId}`);
  };

  return (
    <div className="max-w-md mx-auto mt-6 px-2">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Messages
      </h1>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {messages.map((friend) => (
          <li
            key={friend.id}
            onClick={() => handleMessageClick(friend.id)}
            className="flex items-center justify-between py-3 px-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
              <div className="flex flex-col">
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  {friend.name}
                </span>
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
