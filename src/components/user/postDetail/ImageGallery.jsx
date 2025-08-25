import React from "react";

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-9 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      <div className="flex gap-2 py-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:8080${img}`}
            alt={`Slide ${idx + 1}`}
            className="rounded-md w-32 h-20 sm:w-40 sm:h-28 object-cover flex-shrink-0 snap-center shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
