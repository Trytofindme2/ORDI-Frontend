import React, { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "../components/user/main/BTNav";
import UPNav from "../components/user/main/UPNav";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

const UserLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const currentPath = location.pathname;

  // Paths to hide both navs (static)
  const hideBothNavExact = [
    "/user/ordi/editProfile",
    "/user/ordi/friendlist",
    "/user/ordi/setting",
  ];

  // Check if dynamic conversation page
  const isConversationPage = currentPath.startsWith("/user/ordi/conversation");

  // Paths to hide top nav only
  const hideTopOnlyPaths = [
    "/user/ordi/profile",
    "/user/ordi/notification",
    "/user/ordi/message",
  ];

  // Post detail regex
  const isPostDetail = /^\/user\/ordi\/detail\/[^/]+$/.test(currentPath);

  // Determine whether to hide navs
  const shouldHideBottomNav = hideBothNavExact.includes(currentPath) || isConversationPage;
  const shouldHideTopNav =
    shouldHideBottomNav || hideTopOnlyPaths.includes(currentPath) || isPostDetail;

  // Padding for main content
  const paddingTop = shouldHideTopNav ? "pt-0" : "pt-20";
  const paddingBottom = shouldHideBottomNav ? "pb-0" : "pb-16";

  // Background and shadow styles
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const topNavBg = isDark ? "bg-gray-900 shadow-md" : "bg-white shadow-md";
  const bottomNavBg = isDark
    ? "bg-gray-900 border-t border-gray-700 shadow-t-md"
    : "bg-white border-t border-gray-200 shadow-t-md";

  return (
    <div className={`relative min-h-screen flex flex-col ${bgColor} ${textColor}`}>
      {!shouldHideTopNav && (
        <header className={`fixed top-0 left-0 right-0 z-50 h-16 ${topNavBg}`}>
          <UPNav search={search} setSearch={setSearch} />
        </header>
      )}

      <main
        className={`flex-1 w-full mt-5 overflow-y-auto px-0 sm:px-4 ${paddingTop} ${paddingBottom}`}
      >
        <Outlet context={{ search, user }} />
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
