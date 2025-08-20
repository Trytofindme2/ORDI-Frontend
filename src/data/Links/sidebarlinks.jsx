import {
  FaUsers,
  FaFileAlt,
  FaTags,
  FaUserCog,
} from 'react-icons/fa';

const navSections = [
  {
    title: 'User Management',
    icon: <FaUsers className="inline-block mr-2" />,
    links: [
      { name: 'user', to: '/admin/dashboard/usermanage' }
    ],
  },
  {
    title: 'Content Management',
    icon: <FaFileAlt className="inline-block mr-2" />,
    links: [
      { name: 'Reported Posts', to : '/admin/dashboard/report' },
    ],
  },
  {
    title: 'Category Management',
    icon: <FaTags className="inline-block mr-2" />,
    links: [
      { name: 'Manage Categories', href: '#' },
      { name: 'Manage Tags & Cuisines', href: '#' },
      { name: 'Feature Trending', href: '#' },
    ],
  }
];

export default navSections;
