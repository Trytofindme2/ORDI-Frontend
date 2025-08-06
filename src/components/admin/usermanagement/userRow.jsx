import React, { useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';


const UserRow = ({ user, handleBanToggle, handleDelete }) => {
  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-indigo-50 transition">
        <td className="px-6 py-4 whitespace-nowrap font-semibold">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            user.account_status === 'Active'
              ? 'bg-green-100 text-green-800'
              : user.account_status === 'Banned'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>{user.account_status}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-4">  
          <button title="Delete" onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 transition">
            <FaTrash size={18} />
          </button>
          <button
            title={user.account_status === 'Banned' ? 'Unban' : 'Ban'}
            onClick={() => handleBanToggle(user.id)}
            className={`transition ${
              user.account_status === 'Banned'
                ? 'text-green-600 hover:text-green-800'
                : 'text-yellow-600 hover:text-yellow-800'
            }`}
          >
            {user.account_status === 'Banned' ? <FaCheckCircle size={18} /> : <FaBan size={18} />}
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserRow;
