import React from "react";
import "./VideoCallPage.css";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import VideoCallScreen from "../../components/VideoCallScreens/VideoCallScreen";
import VideoCallOptions from "../../components/Options/VideoCallOptions";
import VideoCallNotification from "../../components/VideoCallNotifications/VideoCallNotification";

const VideoCallPage = () => {
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="video_screens">
          <VideoCallScreen />
        </div>
        <div className="video_screen_controls">
          <VideoCallOptions>
            <VideoCallNotification />
          </VideoCallOptions>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPage;
