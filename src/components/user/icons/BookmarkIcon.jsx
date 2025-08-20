import { useState, useEffect } from "react";
import userAPI from "../../../helper/userAPI";

const BookmarkIcon = ({ postId, userId }) => {
  const [bookmarked, setBookmarked] = useState(false);

  // ✅ Check initial saved state when the component mounts
  useEffect(() => {
    const checkSaved = async () => {
      try {
        if (!postId || !userId) return; // prevent empty queries
        const res = await userAPI.get(`/isSaved?postId=${postId}&userId=${userId}`);
        if (res.status === 200) {
          setBookmarked(res.data.saved); // backend should return { saved: true/false }
        }
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
        }
      } else {
        const response = await userAPI.delete(`/unsavePost?postId=${postId}&userId=${userId}`);
        if (response.status === 200) {
          setBookmarked(false);
        }
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
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
  );
};

export default BookmarkIcon;
