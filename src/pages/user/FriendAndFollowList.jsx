import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import FriendList from '../../components/user/Friend/FriendList';
import { AuthContext } from '../../context/authContext';
import userAPI from '../../helper/userAPI';
import FollowerList from '../../components/user/Friend/FollowerList';
import FollowingList from '../../components/user/Friend/FollowingList';
import toast, { Toaster } from 'react-hot-toast';
const FriendAndFollowList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [reload, setReload] = useState(false);
  const [friends, setFriends] = useState([]);
  const glassyToastStyle = {
    background: isDark ? 'rgba(40,40,40,0.3)' : 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
    color: isDark ? '#fff' : '#111',
    border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '12px 20px',
    fontWeight: 500,
    textAlign: 'center',
    minWidth: '200px',
  };

  const fetchUserData = async () => {
    try {
      const response = await userAPI.post(`getUserData/${user.id}`);
      if (response.status === 200 && response.data?.data) {
        const profile = response.data.data; // assuming ApiResponse structure: { status, data }
        setFollowers(profile.followers || []);
        setFollowings(profile.followings || []);
        setFriends(profile.friends || []);
      } else {
        console.warn("No user data received");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user, reload]);


  const makeUnFriend = async (unfriendid) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: unfriendid
      };
      const response = await userAPI.post('/makeUnFriend', data);
      if (response.status === 200) {
        toast.success('UnFriend successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting UnFriend:', error);
      toast.error('Failed to UnFriend.', { style: glassyToastStyle, position: 'top-center' });
    }
  }
  const makeBanFollower = async (followerid) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: followerid
      };
      const response = await userAPI.post('/makeBanFollower', data);
      if (response.status === 200) {
        toast.success('Follower Ban successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting Ban:', error);
      toast.error('Failed to Follower Ban.', { style: glassyToastStyle, position: 'top-center' });
    }
  }

  const makeUnFollow= async (followingid) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: followingid
      };
      const response = await userAPI.post('/makeUnFollow', data);
      if (response.status === 200) {
        toast.success('UnFollow successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting UnFollow:', error);
      toast.error('Failed to UnFollow.', { style: glassyToastStyle, position: 'top-center' });
    }
  }



  return (
    <div className={`w-full min-h-screen pb-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-4 sm:px-6 
        ${isDark ? 'bg-gray-800/80 border-b border-gray-700' : 'bg-white/80 border-b border-gray-300'} backdrop-blur-md`}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`text-xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
        >
          ←
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-semibold font-serif text-center">
          Friends  & Follow
        </h1>
      </div>
      <Toaster />
      <FriendList friends={friends} makeUnFriend={makeUnFriend} />

      <FollowerList followers={followers} makeBanFollower={makeBanFollower} />

      <FollowingList followings={followings} makeUnFollow={makeUnFollow} />
    </div>
  );
};

export default FriendAndFollowList;
