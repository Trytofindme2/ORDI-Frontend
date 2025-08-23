import React from "react";

const RecipeIngredients = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">📝 Ingredients</h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
