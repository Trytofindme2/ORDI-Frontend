import React, { useRef, useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  if (!videoUrl) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">🎥 Cooking Video</h3>

      <div className="relative">
        <video
          ref={videoRef}
          controls
          muted={isMuted}      // mute by default to allow autoplay
          autoPlay
          loop
          src={`http://localhost:8080${videoUrl}`}
          className="w-full rounded-lg shadow"
        >
          Your browser does not support the video tag.
        </video>

        {/* Toggle sound button */}
        <button
          onClick={toggleMute}
          className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
