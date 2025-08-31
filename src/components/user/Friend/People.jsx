import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';

const People = ({ FriendList, addFriend }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const SearchUserProfile = (email, searchUserId) => {
    navigate(`/user/ordi/searchuserprofile/${email}/${searchUserId}`);
  };


  return (
    <div className={`w-full min-h-screen pb-1 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      <div className="pt-2 px-1 sm:px-1">
        <h2 className="text-m sm:text-xl font-semibold mb-2">
          People You May Know
        </h2>

        <ul className={`divide-y transition-colors ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {FriendList.map((friend, index) => (
            <li
              key={index}
              className="flex items-center py-3 sm:py-4 gap-3"
            >

              <img
                className="w-12 h-12 rounded-full object-cover"
                src={`http://localhost:8080/uploads/${friend.profile_URl}`}
                alt={'Profile'}
                onClick={() => SearchUserProfile(friend.email, friend.id)}
              />
              <div className="flex-1">
                <h3 className={`text-base sm:text-lg font-thin ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {friend.name}
                </h3>
              </div>

              <button onClick={() => addFriend(friend.id)} className="rounded-3xl bg-blue-500 px-4 py-1.5 sm:px-5 sm:py-2 text-white text-sm sm:text-base transition-all hover:bg-blue-600 focus:bg-blue-400">
                Add Friend
              </button>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;
