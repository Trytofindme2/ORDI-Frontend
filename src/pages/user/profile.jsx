import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { ThemeContext } from '../../context/themeContext';
import userAPI from '../../helper/userAPI';

export default function Profile() {
  const [data, setData] = useState(null);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const isDark = theme === 'dark';

  const getFullImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const followers = ['men/32.jpg', 'women/31.jpg', 'men/33.jpg', 'women/32.jpg', 'men/44.jpg', 'women/42.jpg'];

  const articles = [
    { title: 'The Future of Artificial Intelligence: Trends and Challenges', image: '/post-images/Food1.jpg', href: '#' },
    { title: 'The Rise of Blockchain Technology: A Comprehensive Guide', image: '/post-images/Food2.jpg', href: '#' },
    { title: 'How Quantum Computing Will Revolutionize Data Security', image: '/post-images/Food3.jpg', href: '#' },
  ];

  const FetchUserInfo = async () => {
    try {
      const response = await userAPI.get(`findByEmail/${user.email}`);
      if (response.status === 200) {
        const fetchData = response.data.data;
        const normalizedData = { ...fetchData, profileURL: fetchData.profile_URl };
        setData(normalizedData);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const onNavigate = () => {
    navigation('/user/ordi/setting')
  }

  useEffect(() => {
    if (user?.email) FetchUserInfo();
  }, [user?.email]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 flex flex-col items-center`}>
      <div className={`w-full max-w-md ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl shadow-md overflow-hidden border`}>
        <div className="border-b border-gray-300 p-6 text-center">
          <img
            src={getFullImageURL(data?.profileURL) || 'https://via.placeholder.com/150?text=No+Image'}
            alt={data?.name || 'User'}
            className="mx-auto h-28 w-28 rounded-full object-cover border-2 border-blue-600"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
          <h2 className="mt-4 text-2xl font-semibold">{data?.name || 'Loading...'}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data?.address || 'No address available'}</p>

          <div className="flex justify-center gap-3 mt-5">
            <button onClick={onNavigate} className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-md font-semibold text-white">Setting</button>
            <Link to="/user/ordi/friendlist" className="bg-gray-300 hover:bg-gray-400 transition px-5 py-2 rounded-md font-semibold text-gray-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600">
              Friends
            </Link>
            <Link to="/user/ordi/editProfile" className="bg-gray-300 hover:bg-gray-400 transition px-5 py-2 rounded-md font-semibold text-gray-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600">
              Edit
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-300">
            <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
            </svg>
            <span className="font-medium">12 Followers you know</span>
          </div>

          <div className="flex -space-x-2 overflow-hidden">
            {followers.map((path, index) => (
              <img
                key={index}
                className="border-2 border-white dark:border-gray-700 rounded-full h-10 w-10 object-cover shadow"
                src={`https://randomuser.me/api/portraits/${path}`}
                alt={`Follower ${index + 1}`}
              />
            ))}
            <span className="flex items-center justify-center bg-gray-300 text-gray-900 font-semibold border-2 border-gray-400 rounded-full h-10 w-10 text-xs dark:bg-gray-600 dark:text-white dark:border-gray-500">
              +999
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
        {articles.concat(articles).map((article, index) => (
          <article
            key={index}
            className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer 
                        ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} transition`}
          >
            <img src={article.image} alt={article.title} className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{article.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
