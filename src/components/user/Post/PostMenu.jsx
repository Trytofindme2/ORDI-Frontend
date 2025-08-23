import React from 'react';

const PostMenu = ({ isDark, menuOpen, setMenuOpen, onReport }) => {
  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        ⋮
      </button>
      {menuOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
        >
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={onReport}
            >
              Report to Admin
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Follow User
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Block User
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
