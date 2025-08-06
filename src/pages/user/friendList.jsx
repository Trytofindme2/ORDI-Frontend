import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';

const friends = [
  {
    id: 1,
    name: 'Emily Jones',
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    points: 1234,
  },
  {
    id: 2,
    name: 'David Lee',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    points: 987,
  },
  {
    id: 3,
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    points: 876,
  },
  {
    id: 4,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
    points: 765,
  },
  {
    id: 5,
    name: 'Mia Davis',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    points: 654,
  },
];

const FriendList = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className={`w-full min-h-screen pb-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-4 sm:px-6 
        ${isDark ? 'bg-gray-800/80 border-b border-gray-700' : 'bg-white/80 border-b border-gray-300'} backdrop-blur-md`}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`text-xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
        >
          ←
        </button>
         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-semibold font-serif text-center">
          Friends
        </h1>

      </div>

      {/* Friend List */}
      <div className="pt-20 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          My Friends
        </h2>

        <ul className={`divide-y transition-colors ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {friends.map((friend, index) => (
            <li
              key={friend.id}
              className="flex items-center py-3 sm:py-4 gap-3"
            >
              <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{index + 1}.</span>
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={friend.avatar}
                alt={`${friend.name} avatar`}
              />
              <div className="flex-1">
                <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {friend.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{friend.points} points</p>
              </div>
              <Link to="/chat">
                <button className="rounded-3xl bg-blue-500 px-4 py-1.5 sm:px-5 sm:py-2 text-white text-sm sm:text-base transition-all hover:bg-blue-600 focus:bg-blue-400">
                  Message
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
