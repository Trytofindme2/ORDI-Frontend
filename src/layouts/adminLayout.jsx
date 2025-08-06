import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/dashboard/sidebar';
import navSections from '../data/Links/sidebarlinks';
import { AuthContext } from '../context/authContext';
import adminAPI from '../helper/adminAPI';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin , dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await adminAPI.post('log-out');
      if(response.status === 200){
        dispatch({ type: 'admin-log-out' });
        navigate('/admin/log-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        admin={admin}
        loading={loading}
        data={navSections}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
