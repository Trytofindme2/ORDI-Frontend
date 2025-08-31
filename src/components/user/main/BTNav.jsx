import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext'; // Adjust path as needed

export default function BottomNav() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgClass = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300/30';
  const hoverBgClass = theme === 'dark' ? 'dark:hover:bg-gray-800' : 'hover:bg-gray-200';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const strokeColor = theme === 'dark' ? 'white' : 'black';

  return (
    <ul
      className={`fixed bottom-0 flex w-full list-none justify-around border ${bgClass} p-3 shadow-lg backdrop-blur-md xl:hidden rounded-t-xl ${textColorClass}`}
    >
      <li className={`rounded-full p-3 transition-colors duration-200 ${hoverBgClass}`}>
        <Link to="/user/ordi/main" className="flex items-center justify-start gap-2 text-xl hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={strokeColor}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
      </li>

      <li className={`rounded-full p-3 transition-colors duration-200 ${hoverBgClass}`}>
        <Link to={'/user/ordi/message'} className="flex items-center justify-start gap-2 text-xl hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </Link>
      </li>

      <li className={`rounded-full p-3 transition-colors duration-200 ${hoverBgClass}`}>
        <Link to={'/user/ordi/addReceipe'} className="flex items-center justify-start gap-2 text-xl hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={strokeColor}
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </li>

      <li className={`rounded-full p-3 transition-colors duration-200 ${hoverBgClass}`}>
        <Link to={'/user/ordi/Friend'} className="flex items-center justify-start gap-2 text-xl hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 19.5v-.75a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6v.75M12 12v.01"
            />
          </svg>

        </Link>
      </li>

      <li className={`rounded-full p-3 transition-colors duration-200 ${hoverBgClass}`}>
        <Link to={'/user/ordi/profile'} className="flex items-center justify-start gap-2 text-xl hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={strokeColor}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </li>
    </ul>
  );
}
