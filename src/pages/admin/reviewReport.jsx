import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import adminAPI from "../../helper/adminAPI";

const ReviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecipeImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, "")}`;
  };

  const getProfileImageURL = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `http://localhost:8080/uploads/${url.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await adminAPI.get(`ReviewReportDetail/${id}`);
        if (response.status === 200) setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReport();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.delete(`/delete/${id}`);
      if (response.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!recipe)
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="w-full p-6 space-y-10">
      {/* Back Button */}
      <div className="mt-0 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 
                     text-gray-700 dark:text-gray-200 rounded-lg shadow-sm 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span className="text-lg">←</span>
          <span>Back</span>
        </button>

        {/* Delete Recipe Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`px-6 py-2 rounded-lg shadow text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Deleting..." : "Delete Recipe"}
        </button>
      </div>

      {/* Recipe Info */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white ">
          Recipe Details
        </h1>

        {/* Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {recipe.imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={getRecipeImageURL(url)}
              alt={`recipe-${idx}`}
              className="w-full h-52 object-cover rounded-lg shadow-sm"
            />
          ))}
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {recipe.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {recipe.description}
        </p>

        {/* Info Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {recipe.difficulty}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Preparation</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {recipe.preparationTime} mins
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Cooking</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {recipe.cookingTime} mins
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ingredients</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {recipe.ingredients.length}
            </p>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-6">
          <img
            src={getProfileImageURL(recipe.userProfileUrl)}
            alt={recipe.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
          />
          <span className="font-medium text-gray-800 dark:text-white">
            {recipe.name}
          </span>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 space-y-5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          Reported Issues
        </h2>

        {recipe.reports.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No reports for this recipe.
          </p>
        ) : (
          <div className="space-y-3">
            {recipe.reports.map((report, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <img
                  src={getProfileImageURL(report.reporterProfileUrl)}
                  alt={report.reportedByName || "Anonymous"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-800 dark:text-white">
                      {report.reportedByName || "Anonymous"}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      {dayjs(report.reportAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Reason:</strong> {report.reportReason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewReport;
