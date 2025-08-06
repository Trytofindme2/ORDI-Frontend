const TimeInputs = ({ preparationTime, setPreparationTime, cookingTime, setCookingTime, isDark }) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-1">
      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Prep Time
      </label>
      <input
        type="text"
        min="0"
        value={preparationTime}
        onChange={(e) => setPreparationTime(Number(e.target.value))}
        className={`
          w-full px-4 py-3 border rounded-lg transition
          ${isDark ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
        `}
      />
    </div>
    <div className="flex-1">
      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Cook Time
      </label>
      <input
        type="text"
        min="0"
        value={cookingTime}
        onChange={(e) => setCookingTime(Number(e.target.value))}
        className={`
          w-full px-4 py-3 border rounded-lg transition
          ${isDark ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
        `}
      />
    </div>
  </div>
);

export default TimeInputs;
