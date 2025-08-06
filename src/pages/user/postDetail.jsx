import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext'; // adjust path if needed

const PostDetail = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const { id } = useParams();

  const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';

  return (
    <div className={`min-h-screen px-4 py-8 ${bgClass}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🍽️ Recipe Details</h1>

        <div className={`p-6 rounded-xl border shadow-md transition-all ${cardBg} ${borderColor}`}>
          <h2 className="text-2xl font-semibold mb-2">Sample Recipe Title</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Post ID: <span className="font-medium text-blue-500">{id}</span>
          </p>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This is a description of the recipe. It talks about what the dish is and why it's great.
          </p>

          <img
            src="https://via.placeholder.com/600x300"
            alt="Recipe"
            className="rounded-lg w-full object-cover max-h-[300px] mb-4"
          />

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>2 cups flour</li>
              <li>1 tsp sugar</li>
              <li>1/2 tsp salt</li>
              <li>1 tbsp olive oil</li>
            </ul>
          </div>

          <div className="text-sm space-y-1">
            <p>Preparation Time: <span className="font-medium">15 minutes</span></p>
            <p>Cooking Time: <span className="font-medium">30 minutes</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
