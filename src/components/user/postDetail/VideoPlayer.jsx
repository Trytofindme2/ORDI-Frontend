import React, { useRef, useState } from "react";

const VideoPlayer = ({ videoUrl, fixedWidth = "100%", fixedHeight = "240px" }) => {
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
    <div className="relative">
      <video
        ref={videoRef}
        controls
        muted={isMuted}
        autoPlay
        loop
        src={`http://localhost:8080${videoUrl}`}
        className="rounded-lg shadow"
        style={{ width: fixedWidth, height: fixedHeight, objectFit: "cover" }}
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
  );
};

export default VideoPlayer;
