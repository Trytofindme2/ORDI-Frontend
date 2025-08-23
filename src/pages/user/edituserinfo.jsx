import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAPI from '../../helper/userAPI';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';
import { ThemeContext } from '../../context/themeContext';

const EditUserInfo = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [profileURL, setProfileURL] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const { user, dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userAPI.get(`findByEmail/${user.email}`);
        if (response.status === 200) {
          const data = response.data.data;
          setName(data.name || '');
          setPhoneNumber(data.phoneNumber || '');
          setBio(data.bio || '');
          setAddress(data.address || '');
          setProfileURL(data.profileURL || data.profile_URl || '');
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };
    fetchUserInfo();
  }, [user.email]);

  // Make sure the image URL matches backend resource handler
  const getFullImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    // your backend serves images at /profile-images/<filename>
    return `http://localhost:8080/profile-images/${url.replace(/^\/+/, '')}`;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewURL(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setFile(null);
      setPreviewURL('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const userUpdateRequest = { name, phoneNumber, bio, address, profileURL };
      formData.append('userUpdateRequest', new Blob([JSON.stringify(userUpdateRequest)], { type: 'application/json' }));
      if (file) formData.append('profileImage', file);

      const response = await userAPI.patch(`editProfile/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        dispatch({ type: 'userProfile-update', payload: response.data.data });
        toast.success('Profile updated successfully!');
        setTimeout(() => navigate('/user/ordi/profile'), 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.errorMessage || 'Failed to update profile');
    }
  };

  const handleCancel = () => navigate('/user/ordi/profile');

  return (
    <div className={`min-h-screen px-4 py-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster position="top-right" />
      <div className={`max-w-md mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 shadow">
            {previewURL ? (
              <img src={previewURL} alt="Preview" className="object-cover w-full h-full" />
            ) : profileURL ? (
              <img src={getFullImageURL(profileURL)} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs">No Image</div>
            )}
          </div>
          <label className="mt-2 text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
            Change Photo
            <input onChange={handleFileChange} type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Email" value={user.email} disabled />
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextArea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />

          <div className="flex flex-col gap-3 pt-4">
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="w-full py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, disabled = false }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 
                 bg-gray-50 dark:bg-gray-700 
                 dark:border-gray-600 
                 text-gray-900 dark:text-white 
                 placeholder:text-gray-500 
                 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <textarea
      rows="3"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 
                 bg-gray-50 dark:bg-gray-700 
                 dark:border-gray-600 
                 text-gray-900 dark:text-white 
                 placeholder:text-gray-500 
                 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default EditUserInfo;
