import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactPlayer 
        url="your-video.mp4" 
        controls
        width="800px"
        height="450px"
      />
    </div>
  );
};

export default VideoPlayer;
