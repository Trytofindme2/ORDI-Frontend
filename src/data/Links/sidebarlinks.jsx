import {
  FaUsers,
  FaFileAlt,
  FaTags,
  FaUserCog,
} from 'react-icons/fa';

const navSections = [
  {
    title: 'User',
    icon: <FaUsers className="inline-block mr-2" />,
    links: [
      { name: 'User Management', to: '/admin/dashboard/usermanage' }
    ],
  },
  {
    title: 'Content',
    icon: <FaFileAlt className="inline-block mr-2" />,
    links: [
      { name: 'Reported Posts', to : '/admin/dashboard/report' },
    ],
  }
];

export default navSections;
