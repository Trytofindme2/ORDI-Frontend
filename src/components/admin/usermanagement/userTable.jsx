import React from 'react'
import UserRow from  './userRow';

const UserTable = ({ users, handleBanToggle, handleDelete }) => (
  <div className="flex-grow overflow-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-indigo-50 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap">NAME</th>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap">EMAIL</th>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap">PHONE NUMBER</th>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap">ROLE</th>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap">STATUS</th>
          <th className="px-6 py-3 font-medium text-indigo-700 whitespace-nowrap text-center">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-8 text-gray-400 italic">
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              handleBanToggle={handleBanToggle}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default UserTable;