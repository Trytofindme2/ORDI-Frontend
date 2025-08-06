import React, { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/user/main/BTNav';
import UPNav from '../components/user/main/UPNav';
import { ThemeContext } from '../context/themeContext';

const UserLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';


  const hideBothNavPaths = [
    '/user/ordi/editProfile',
    '/user/ordi/friendlist',
    '/user/ordi/setting',
  ];

  const hideTopOnlyPaths = [
    '/user/ordi/profile',
  ];

  const isPostDetail = /^\/user\/ordi\/detail\/[^/]+$/.test(currentPath);


  const shouldHideTopNav =
    hideBothNavPaths.includes(currentPath) ||
    hideTopOnlyPaths.includes(currentPath) ||
    isPostDetail;

  const shouldHideBottomNav =
    hideBothNavPaths.includes(currentPath); 

  const paddingTop = shouldHideTopNav ? 'pt-0' : 'pt-16';
  const paddingBottom = shouldHideBottomNav ? 'pb-0' : 'pb-16';

  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const topNavBg = isDark ? 'bg-gray-900 shadow-md' : 'bg-white shadow-md';
  const bottomNavBg = isDark
    ? 'bg-gray-900 border-t border-gray-700 shadow-t-md'
    : 'bg-white border-t border-gray-200 shadow-t-md';

  const [search, setSearch] = useState('');

  return (
    <div className={`relative min-h-screen flex flex-col ${bgColor} ${textColor}`}>

      {!shouldHideTopNav && (
        <header className={`fixed top-0 left-0 right-0 z-50 h-16 ${topNavBg}`}>
          <UPNav search={search} setSearch={setSearch} />
        </header>
      )}


      <main className={`flex-1 w-full overflow-y-auto px-0 sm:px-4 ${paddingTop} ${paddingBottom}`}>
        <Outlet context={{ search }} />
      </main>


      {!shouldHideBottomNav && (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 h-16 ${bottomNavBg}`}>
          <BottomNav />
        </nav>
      )}
    </div>
  );
};

export default UserLayout;
