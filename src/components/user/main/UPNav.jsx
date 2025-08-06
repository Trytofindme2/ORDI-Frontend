import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';

export default function UPNav({ search, setSearch }) {
  const [activeTab, setActiveTab] = React.useState('People');
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const bgClass = isDark
    ? 'bg-gray-900 text-white shadow-md border-gray-700'
    : 'bg-white text-black shadow-md border-gray-300';

  const inputTextColor = isDark ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500';
  const inputBgColor = isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300';

  if (location.pathname === '/user/ordi/profile') return null;

  return (
    <div className={`xl:hidden w-full px-4 py-3 ${bgClass} backdrop-blur-lg border rounded-b-lg`}>
      <div className={`flex items-center ${inputBgColor} border rounded-full px-4 py-2 shadow-inner`}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for people, dishes, or tags..."
          className={`flex-1 bg-transparent focus:outline-none ${inputTextColor}`}
        />
        <button className="ml-2 bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition duration-150 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2M17.5 11a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
        </button>
      </div>

      <div
        className={`mt-4 flex justify-around text-sm font-semibold border-b ${
          isDark ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'
        }`}
      >
        {['People', 'Dish', 'Hashtag'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-2 text-center transition duration-200 ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
