import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import userAPI from "../../../helper/userAPI";
import { ThemeContext } from "../../../context/themeContext";

const BookmarkIcon = ({ postId, userId }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Fetch initial state (bookmarked + count)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId || !userId) return;

        // 1. check if this user saved
        const res = await userAPI.get(`/isSaved?postId=${postId}&userId=${userId}`);
        if (res.status === 200) setBookmarked(res.data.saved);

        // 2. get save count
        const countRes = await userAPI.get(`/count/${postId}`);
        if (countRes.status === 200) setSaveCount(countRes.data);
      } catch (error) {
        console.error("Failed to load bookmark info:", error);
      }
    };
    fetchData();
  }, [postId, userId]);

  // Toggle save/unsave
  const handleToggle = async () => {
    try {
      if (!bookmarked) {
        const response = await userAPI.post("/savePost", { postId, userId });
        if (response.status === 200) {
          setBookmarked(true);
          setSaveCount((prev) => prev + 1); // increment count
          toast.success("Post saved!", { style: glassyToastStyle(), position: "top-center" });
        }
      } else {
        const response = await userAPI.delete(`/unsavePost?postId=${postId}&userId=${userId}`);
        if (response.status === 200) {
          setBookmarked(false);
          setSaveCount((prev) => Math.max(prev - 1, 0)); // decrement count
          toast("Removed Post.", { icon: "🗑️", style: glassyToastStyle(), position: "top-center" });
        }
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      toast.error("Something went wrong!", { style: glassyToastStyle(), position: "top-center" });
    }
  };

  const glassyToastStyle = () => ({
    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    color: isDark ? "#ffffff" : "#1f2937",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "500",
    textAlign: "center",
    minWidth: "200px",
  });

  return (
    <>
      <Toaster />
      <div className="flex items-center gap-1 cursor-pointer" onClick={handleToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill={bookmarked ? "yellow" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 
              4.5 21V5.507c0-1.108.806-2.057 1.907-2.185
              a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
        <span>{saveCount}</span>
      </div>
    </>
  );
};

export default BookmarkIcon;
