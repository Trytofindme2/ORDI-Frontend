import React, { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

const RecipeIngredients = ({ ingredients, preparationTime, cookingTime, difficulty }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className={`max-w-md mx-auto mb-6 p-4 rounded-lg shadow-md
                     ${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
      {/* Title */}
      <h3 className={`text-lg font-bold mb-3 border-b pb-2
                      ${isDark ? "border-gray-700" : "border-gray-300"}`}>
        About Ingredients
      </h3>

      {/* Ingredients List */}
      <ul className="list-disc list-inside space-y-1 text-sm mb-4">
        {ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Other Info */}
      <div className="text-sm space-y-1">
        <p><span className="font-medium">Preparation Time:</span> {preparationTime} mins</p>
        <p><span className="font-medium">Cooking Time:</span> {cookingTime} mins</p>
        <p><span className="font-medium">Difficulty:</span> {difficulty}</p>
      </div>
    </div>
  );
};

export default RecipeIngredients;
