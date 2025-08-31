import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';

const FollowerList = ({ followers, makeBanFollower }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [showAll, setShowAll] = useState(false);

  const Followers = showAll ? followers : followers.slice(0, 5);
  const navigate = useNavigate();
  const SearchUserProfile = (email, searchUserId) => {
    navigate(`/user/ordi/searchuserprofile/${email}/${searchUserId}`);
  };
  return (
    <div className={`w-full pb-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      <div className="pt-2 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          My Followers ({followers.length})
        </h2>

        <ul className={`divide-y transition-colors ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {Followers.map((follower) => (
            <li
              key={follower.id}
              className="flex items-center py-3 sm:py-4 gap-3">
              <img onClick={() => SearchUserProfile(follower.email, follower.id)}
                className="w-12 h-12 rounded-full object-cover"
                src={`http://localhost:8080/uploads/${follower.profile_URl}`}
                alt={`${follower.name} avatar`}
              />
              <div className="flex-1">
                <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {follower.name}
                </h3>
              </div>
              <button onClick={() => makeBanFollower(follower.id)} className="rounded-3xl bg-blue-500 px-4 py-1.5 sm:px-5 sm:py-2 text-white text-sm sm:text-base transition-all hover:bg-blue-600 focus:bg-blue-400">
                Ban
              </button>
            </li>
          ))}
        </ul>

        {!showAll && followers.length > 10 && (
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

export default FollowerList;
