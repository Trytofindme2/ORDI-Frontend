import React, { useState } from "react";

const IngredientList = ({ ingredients, setIngredients, isDark }) => {
  const [input, setInput] = useState("");

  const addIngredient = (e) => {
    e.preventDefault(); // prevent form submit if inside a form
    const trimmed = input.trim();
    if (trimmed) {
      setIngredients((prev) => [...prev, trimmed]);
      setInput("");
    }
  };

  const removeIngredient = (index, e) => {
    e.stopPropagation(); // prevent bubbling up
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submit on Enter
      addIngredient(e);
    }
  };

  return (
    <div className="mb-6">
      <label
        className={`block mb-2 font-medium ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Ingredients
      </label>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // handle Enter key
          className={`
            flex-1 px-4 py-2 border rounded-lg transition
            ${
              isDark
                ? "bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }
          `}
          placeholder="Add an ingredient"
        />
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {ingredients.map((item, i) => (
          <li
            key={i}
            className={`
              flex justify-between px-4 py-2 rounded-lg transition
              ${isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"}
            `}
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={(e) => removeIngredient(i, e)}
              className={`${
                isDark
                  ? "text-red-400 hover:text-red-500"
                  : "text-red-500 hover:text-red-600"
              } text-sm`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
