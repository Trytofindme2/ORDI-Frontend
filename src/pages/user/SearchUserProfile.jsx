import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import { AuthContext } from '../../context/authContext';
import userAPI from '../../helper/userAPI';
export default function SearchUserProfile() {
    const [data, setData] = useState(null);
    const [posts, setPosts] = useState([]); // store user posts
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const { email, searchUserId } = useParams();
    const [userData, setUser] = useState([]);
    const navigate = useNavigate();
    const getPostImageURL = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `http://localhost:8080/${url.replace(/^\/+/, '')}`;
    };

    const FetchUserInfo = async () => {
        try {
            const response = await userAPI.get(`findByEmail/${email}`);
            if (response.status === 200) {
                const fetchData = response.data.data;
                const normalizedData = { ...fetchData, profileURL: fetchData.profile_URl };
                setData(normalizedData);
                setUser(normalizedData);
                console.log(normalizedData);

            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const FetchUserPosts = async (searchUserId) => {
        try {
            const response = await userAPI.get(`getOwnPost/${searchUserId}`);
            if (response.status === 200) {
                setPosts(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    useEffect(() => {
        if (!searchUserId) {
            setData(null);
            setPosts([]);
        } else {

            FetchUserInfo();
            FetchUserPosts(searchUserId);
        }
    }, [searchUserId]);  // ✅ more stable dependencies

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            } p-4 flex flex-col items-center`}>
            <div className={`fixed top-0 mb-10 left-0 w-full h-16 z-50 flex items-center justify-between px-4 sm:px-6 
        ${isDark ? 'bg-gray-800/80 border-b border-gray-700' : 'bg-white/80 border-b border-gray-300'} backdrop-blur-md`}>
                <button
                    onClick={() => navigate(-1)}
                    className={`text-xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                >
                    ←
                </button>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-semibold font-serif text-center">
                    Friend Profile
                </h1>
            </div>
            <div className={`w-full mt-10 max-w-md ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
                } rounded-xl shadow-md overflow-hidden border`}>
                <div className="border-b border-gray-300 p-6 text-center">
                    <img
                        src={
                            userData.profile_URl ? `http://localhost:8080/uploads/${userData.profile_URl}` :
                                'men/32.jpg'
                        }
                        alt={"Profile"}
                        className="mx-auto h-28 w-28 rounded-full object-cover border-2 border-blue-600"
                    />
                    <h2 className="mt-4 text-2xl font-semibold">
                        {data?.name || 'Loading...'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {data?.address || 'No address available'}
                    </p>

                </div>
            </div>
            <div className="mt-8 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
                {posts.length > 0 ? (
                    posts.map((post, index) => (

                        <article key={index}
                            className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer ${isDark
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                } transition`}>
                            <Link to={`/user/ordi/detail/${post.id}`} className="overflow-hidden rounded-3xl">
                                <img
                                    src={getPostImageURL(post.imageUrls[0])}
                                    alt={post.title}
                                    className="rounded-3xl w-full object-cover max-h-[400px] transition-transform duration-300 hover:scale-105"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{post.title}</h3>
                                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                                    {post.description}
                                </p>
                            </div>
                        </article>

                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
                        No posts yet.
                    </p>
                )}
            </div>
        </div>
    );
}

