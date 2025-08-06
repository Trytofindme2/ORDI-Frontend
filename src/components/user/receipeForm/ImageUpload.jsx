const ImageUpload = ({ images, setImages, imagePreviews, setImagePreviews, isDark }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <label className={`block mb-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        Upload Images (Max 4)
      </label>

      <label
        className={`
          flex justify-center items-center w-full px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition
          ${isDark
            ? 'border-pink-600 bg-pink-900 text-pink-400 hover:bg-pink-800'
            : 'border-pink-300 bg-pink-50 text-pink-600 hover:bg-pink-100'}
        `}
      >
        <span className="font-semibold">Click or drag to upload</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt={`preview-${i}`}
                className="h-24 w-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
