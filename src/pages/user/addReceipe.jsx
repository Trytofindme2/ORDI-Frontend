import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";
import userAPI from "../../helper/userAPI";
import ImageUpload from "../../components/user/receipeForm/ImageUpload";
import VideoUpload from "../../components/user/receipeForm/VideoUpload";
import IngredientList from "../../components/user/receipeForm/IngredientList";
import TimeInputs from "../../components/user/receipeForm/TimeInput";

const AddRecipeMobile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [preparationTime, setPreparationTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        description,
        difficulty,
        preparationTime,
        cookingTime,
        ingredients,
        imageUrls: [],
      };
      const res = await userAPI.post(`/createReceipe/${user.id}`, data);
      if (res.status === 200) {
        console.log("Recipe created:", res.data);
        setTitle('');
        setDescription('');
        setDifficulty('');
        setPreparationTime(0);
        setCookingTime(0);
        setIngredients([]);
        setImages([]);
        setImagePreviews([]);
        setVideoFile(null);
        setVideoPreview(null);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md mx-auto p-4 sm:p-6 rounded-3xl shadow-md transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Recipe</h2>

      {/* Title */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border box-border transition ${
            isDark
              ? 'bg-gray-800 border-gray-600 placeholder-gray-400 text-white'
              : 'border-gray-300 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="E.g. Spaghetti Bolognese"
          required
        />
      </div>

      {/* Difficulty */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border box-border transition ${
            isDark
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'border-gray-300 text-gray-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        >
          <option value="">Select</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border box-border transition ${
            isDark
              ? 'bg-gray-800 border-gray-600 placeholder-gray-400 text-white'
              : 'border-gray-300 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
          placeholder="Write a short description..."
          required
        />
      </div>

      {/* Ingredients */}
      <div className="mb-5">
        <IngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
          isDark={isDark}
        />
      </div>

      {/* Image Upload */}
      <div className="mb-5">
        <ImageUpload
          images={images}
          setImages={setImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          isDark={isDark}
        />
      </div>

      {/* Video Upload */}
      <div className="mb-5">
        <VideoUpload
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          videoPreview={videoPreview}
          setVideoPreview={setVideoPreview}
          isDark={isDark}
        />
      </div>

      {/* Time Inputs */}
      <div className="mb-5">
        <TimeInputs
          preparationTime={preparationTime}
          setPreparationTime={setPreparationTime}
          cookingTime={cookingTime}
          setCookingTime={setCookingTime}
          isDark={isDark}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 mt-2 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-all"
      >
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeMobile;
