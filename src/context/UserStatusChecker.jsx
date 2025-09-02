import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import userAPI from "../helper/userAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserStatusChecker = ({ children }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const checkStatus = async () => {
      try {
        const response = await userAPI.get(`user/${user.id}`);
        const latestUser = response.data.data;

        // Update context & localStorage via dispatch
        dispatch({ type: "user-verified", payload: latestUser });

        // If banned, logout
        if (latestUser.account_status === "Banned") {
          dispatch({ type: "user-log-out" });
          toast.error("Your account has been banned. You have been logged out.");
          navigate("/log-in");
        }
      } catch (err) {
        console.error("Error checking user status:", err);
      }
    };

    // Run immediately, then every 30 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, [user, dispatch, navigate]);

  return children;
};

export default UserStatusChecker;
