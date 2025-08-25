import React, { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userAPI.post('log-out');
      if (response.status === 200) {
        localStorage.removeItem('user');
        navigate('/user/log-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-darkblue-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 flex items-center gap-4 px-4 py-3 shadow-md ${isDark ? 'bg-darkblue-900' : 'bg-white'}`}>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-darkblue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>

      {/* Main content */}
      <main className="p-4 space-y-5">
        {/* Theme toggle card */}
        <section className={`rounded-xl p-4 shadow-sm ${isDark ? 'bg-darkblue-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Theme</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-darkblue-700 transition"
            >
              {isDark ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-12.34l-.71.71M4.05 19.95l-.71-.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M21.752 15.002A9.718 9.718 0 0112.004 22C6.477 22 2 17.523 2 12.002 2 7.661 4.933 3.964 9 2.737A7.5 7.5 0 0021.752 15z" />
                  </svg>
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </section>

        {/* Saved Posts card */}
        <section
          onClick={() => navigate('/user/ordi/savePostList')}
          className={`cursor-pointer rounded-xl p-4 shadow-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-darkblue-700 transition ${isDark ? 'bg-darkblue-800' : 'bg-white'}`}
        >
          <span className="text-sm font-medium">Saved Posts</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5l7 7-7 7" />
          </svg>
        </section>

        {/* Logout card */}
        <section className={`rounded-xl p-4 shadow-sm ${isDark ? 'bg-darkblue-800' : 'bg-white'}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md 
              text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
            </svg>
            Log Out
          </button>
        </section>
      </main>
    </div>
  );
};

export default Setting;
