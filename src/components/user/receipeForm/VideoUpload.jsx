import React from "react";

const VideoUpload = ({ videoFile, setVideoFile, videoPreview, setVideoPreview, isDark }) => {
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-6">
      <label className={`block mb-2 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Upload Video (optional)
      </label>

      <label
        className={`
          flex justify-center items-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition
          ${
            isDark
              ? "border-indigo-600 text-indigo-400 hover:bg-indigo-900/20"
              : "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          }
        `}
      >
        <span>Click to upload video</span>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
        />
      </label>

      {videoPreview && (
        <video
          controls
          src={videoPreview}
          className="mt-4 rounded-lg w-full h-48 object-cover"
          style={{ backgroundColor: isDark ? "#1e293b" : "transparent" }}
        />
      )}
    </div>
  );
};

export default VideoUpload;
