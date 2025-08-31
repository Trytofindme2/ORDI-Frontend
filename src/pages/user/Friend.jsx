import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';
import Friends from '../../components/user/Friend/People';
import FriendRequest from '../../components/user/Friend/FriendRequest';
import FriendConfirm from '../../components/user/Friend/FriendReceive';
import toast, { Toaster } from 'react-hot-toast';

const Friend = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { user } = useContext(AuthContext);
  const [FriendList, setFriendList] = useState([]);
  const [FriendRequestList, setFriendRequestList] = useState([]);
  const [FriendReceiveList, setFriendReceiveList] = useState([]);
  const [reload, setReload] = useState(false);
  const fetchFriends = async () => {
    if (!user) return;
    try {
      const res = await userAPI.post(`/getFriendPageData/${user.id}`);
      if (res.status === 200 && res.data.data) {
        const data = res.data.data;
        setFriendList(data.friends || []);
        setFriendReceiveList(data.friendReceivelist || []);
        setFriendRequestList(data.friendRequestlist || []);
      } else {
        console.warn("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };
  useEffect(() => {
    fetchFriends();
  }, [user, reload]);

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

  const addFriend = async (userId) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: userId
      };
      const response = await userAPI.post('/addFriend', data);
      if (response.status === 200) {
        toast.success('Add Friend successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting Add Friend:', error);
      toast.error('Failed to Add Friend.', { style: glassyToastStyle, position: 'top-center' });
    }
  };
  const confirmFriend = async (userId) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: userId
      };
      const response = await userAPI.post('/confirmFriend', data);
      if (response.status === 200) {
        toast.success('Confirm Friend successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
      }
    } catch (error) {
      console.error('Error submitting confirm:', error);
      toast.error('Failed to submit confirm.', { style: glassyToastStyle, position: 'top-center' });
    }
  };

  const cancelFriend = async (friendId) => {
    try {
      const data = {
        addUserId: user.id,
        receiveUserId: friendId
      };
      const response = await userAPI.post('/cancelFriend', data);
      if (response.status === 200) {
        toast.success('Friend canceled successfully!', { style: glassyToastStyle, position: 'top-center' });
        setReload(prev => !prev);
        setFriendRequestList(prev => prev.filter(friend => friend.id !== friendId));
      } else {
        toast.error(response.data?.message || 'Failed to cancel friend.', { style: glassyToastStyle, position: 'top-center' });
      }

    } catch (error) {
      console.error('Error submitting cancel:', error);
      toast.error('Failed to cancel friend.', {
        style: glassyToastStyle,
        position: 'top-center'
      });
    }
  };

  return (
    <div className={`min-h-screen px-3 py-1 space-y-1 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Toaster />
      <FriendRequest FriendRequestList={FriendRequestList}
        cancelFriend={cancelFriend}
      />
      <FriendConfirm FriendReceiveList={FriendReceiveList}
        confirmFriend={confirmFriend}
      />
      <Friends FriendList={FriendList} addFriend={addFriend} />
    </div>
  );
};

export default Friend;
