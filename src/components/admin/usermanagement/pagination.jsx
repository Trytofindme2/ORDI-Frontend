import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex flex-wrap justify-center gap-2 mt-4"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        type="button"
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-disabled={currentPage === 0}
        aria-label="Previous page"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
            page === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 hover:bg-gray-200'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page + 1}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}

      <button
        type="button"
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        aria-disabled={currentPage === totalPages - 1}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
