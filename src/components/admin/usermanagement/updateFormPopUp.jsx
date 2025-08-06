const UpdateFormPopUp = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-red-500">✖</button>
        <h3 className="text-xl font-semibold mb-4">Edit User: {user.name}</h3>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" defaultValue={user.name} className="w-full mt-1 p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" defaultValue={user.email} className="w-full mt-1 p-2 border rounded-md" />
          </div>

          {/* Add more fields as needed */}

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFormPopUp;
