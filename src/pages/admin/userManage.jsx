import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../../components/admin/usermanagement/pagination';
import SearchBar from '../../components/admin/usermanagement/searchBar';
import UserTable from '../../components/admin/usermanagement/userTable';
import adminAPI from '../../helper/adminAPI';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/authContext';

const pageSize = 10;

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { admin } = useContext(AuthContext);
  const navigation = useNavigate();

  const fetchPaginatedUsers = async (page = 0) => {
    try {
      const response = await adminAPI.get(`getUserList?page=${page}&size=${pageSize}`);
      if (response.status === 200) {
        const data = response.data.users;
        setPaginatedUsers(data.content || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await adminAPI.get(`getUserList?page=0&size=0`);
      if (response.status === 200) {
        const usersData = response.data.users;
        setAllUsers(Array.isArray(usersData) ? usersData : []);
      }
    } catch (error) {
      toast.error('Failed to fetch all users');
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchPaginatedUsers(page);
    }
  };

  const handleBanToggle = async (id) => {
    try {
      const targetList = search ? allUsers : paginatedUsers;
      const user = targetList.find((u) => u.id === id);
      if (!user) return;

      const newStatus = user.account_status === 'Banned' ? 'Active' : 'Banned';
      const response = await adminAPI.post(`updateAccountStatus/${id}`, {
        account_status: newStatus,
      });

      if (response.status === 200) {
        toast.info(`${user.name} is now ${newStatus}`);
        if (search) {
          setAllUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, account_status: newStatus } : u))
          );
        } else {
          setPaginatedUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, account_status: newStatus } : u))
          );
        }
      }
    } catch (error) {
      toast.error('Error updating account status');
    }
  };

  
  useEffect(() => {
    if (!admin) {
      toast.error('Access denied. Please log in as admin.');
      setTimeout(() => {
        navigation('/admin/log-in');
      }, 2000);
    }
  }, [admin]);

  useEffect(() => {
    if (!search) {
      fetchPaginatedUsers(currentPage);
    }
  }, [currentPage, search]);

  useEffect(() => {
    if (search) {
      fetchAllUsers();
      setCurrentPage(0);
    }
  }, [search]);

  const filteredUsers = search
    ? allUsers.filter((user) =>
        `${user.name} ${user.email} ${user.role} ${user.phoneNumber}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : paginatedUsers;




  if (!admin) {
  return (
    <div className="bg-white min-h-[80vh]">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

  return (
     <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg text-gray-800 min-h-[80vh]">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 flex-shrink-0">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <UserTable
        users={filteredUsers}
        handleBanToggle={handleBanToggle}
      />

      {!search && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
