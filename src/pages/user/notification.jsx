import React, { useEffect } from 'react';

export default function Notification() {
    const noti = [
        {
            id: 1,
            name: 'Emily Jones',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            description: 'Emily liked your recent post about cooking.',
        },
        {
            id: 2,
            name: '李伟 (Li Wei)',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            description: '李伟 commented on your travel photo.',
        },
        {
            id: 3,
            name: 'Sophia Williams',
            avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
            description: 'Sophia started following you.',
        },
        {
            id: 4,
            name: '张伟 (Zhang Wei)',
            avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
            description: '张伟 liked your latest kitchen setup photo.',
        },
        {
            id: 5,
            name: 'Olivia Brown',
            avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
            description: 'Olivia sent you a message about your cooking tips.',
        },
        {
            id: 6,
            name: '王芳 (Wang Fang)',
            avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
            description: '王芳 liked your latest kitchen setup photo.',
        },
        {
            id: 7,
            name: 'Aye Htet',
            avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
            description: 'Aye Htet started following your food blog.',
        },
        {
            id: 8,
            name: 'Wai Yan Min',
            avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
            description: 'Wai Yan started following your food blog.',
        },
        {
            id: 9,
            name: 'Yan Yan',
            avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
            description: 'Yan Yan started following your food blog.',
        },
    ];

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 shadow-md overflow-hidden w-full mx-auto mt-4 rounded-3xl ">
            <div className="fixed top-0 w-full h-20 text-center transform z-50 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 px-6 py-2 rounded-md shadow-lg border border-gray-300 dark:border-gray-700">
                <h1 className="text-center pt-4 text-2xl sm:text-3xl font-bold font-serif text-gray-900 dark:text-white">
                    Notification
                </h1>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 py-3 px-4 mt-20">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">My Notifications</h2>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {noti.map((noti) => (
                    <li key={noti.id} className="flex items-center py-4 px-6">
                        <img
                            className="w-12 h-12 rounded-full object-cover mr-4"
                            src={noti.avatar}
                            alt={`${noti.name} avatar`}
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{noti.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-base">{noti.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
