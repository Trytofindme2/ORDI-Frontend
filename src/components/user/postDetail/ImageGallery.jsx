import React from "react";

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={`http://localhost:8080${img}`}
          alt={`Recipe ${idx + 1}`}
          className="rounded-lg w-full object-cover max-h-[300px] shadow"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
