import React from 'react'

const SearchBar = ({ search, setSearch }) => (
  <div className="relative w-full md:w-80">
    <input
      type="text"
      placeholder="Search by name, email, role..."
      className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-300 bg-white/90 text-gray-800 placeholder-gray-400 shadow-sm"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
);

export default SearchBar; 