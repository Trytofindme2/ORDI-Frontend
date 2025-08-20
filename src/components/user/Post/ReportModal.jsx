import React from 'react';

const ReportModal = ({ show, isDark, reason, setReason, onClose, onSubmit }) => {
  
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg shadow-xl w-11/12 max-w-md ${isDark ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-black'}`}>
        <h2 className="text-xl font-bold mb-4">Report Recipe</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Why are you reporting this recipe?"
          className={`w-full h-24 p-2 rounded border resize-none mb-3 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        ></textarea>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-full">Cancel</button>
          <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-full">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
