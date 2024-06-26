import React, { useContext, useEffect } from "react";
import "./VideoCallScreen.css";
import { SocketContext } from "../../context/SocketContext";

const VideoCallScreen = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  useEffect(() => {
    console.log("myVideo:", myVideo.current);
    console.log("userVideo:", userVideo.current);
  }, [myVideo, userVideo]);
  return (
    <div className="video_screens_container">
      {/* Our Own Video */}
      <div className="video1-container">
        <div className="video1">
          <h3 className="title">{name || "Name"}</h3>
          <video
            ref={myVideo}
            playsInline
            muted
            autoPlay
            style={{ width: "600px", height: "400px" }}
          />
        </div>
      </div>
      {/* User Video */}
      <div className="video2-container">
        <div className="video2">
          <h3 className="title">{name || "Name"}</h3>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "600px", height: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
