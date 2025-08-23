import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import userAPI from "../../../helper/userAPI";
import { ThemeContext } from "../../../context/themeContext"; // if you use ThemeContext

const BookmarkIcon = ({ postId, userId }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Check initial saved state
  useEffect(() => {
    const checkSaved = async () => {
      try {
        if (!postId || !userId) return;
        const res = await userAPI.get(`/isSaved?postId=${postId}&userId=${userId}`);
        if (res.status === 200) setBookmarked(res.data.saved);
      } catch (error) {
        console.error("Failed to check saved status:", error);
      }
    };
    checkSaved();
  }, [postId, userId]);

  const handleToggle = async () => {
    try {
      if (!bookmarked) {
        const response = await userAPI.post("/savePost", { postId, userId });
        if (response.status === 200) {
          setBookmarked(true);
          toast.success("Post saved!", {
            style: glassyToastStyle(),
            position: "top-center",
          });
        }
      } else {
        const response = await userAPI.delete(`/unsavePost?postId=${postId}&userId=${userId}`);
        if (response.status === 200) {
          setBookmarked(false);
          toast("Removed Post.", {
            icon: "🗑️",
            style: glassyToastStyle(),
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      toast.error("Something went wrong!", {
        style: glassyToastStyle(),
        position: "top-center",
      });
    }
  };

  const glassyToastStyle = () => ({
    background: isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.6)", // lighter glass for light mode
    backdropFilter: "blur(10px)",
    color: isDark ? "#ffffff" : "#1f2937", // white for dark, dark gray for light
    border: isDark
      ? "1px solid rgba(255, 255, 255, 0.3)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "500",
    textAlign: "center",
    minWidth: "200px",
  });

  return (
    <>
      <Toaster />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 cursor-pointer"
        fill={bookmarked ? "yellow" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        onClick={handleToggle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
    </>
  );
};

export default BookmarkIcon;
