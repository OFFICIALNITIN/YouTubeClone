import React, { useEffect, useState } from "react";
import Home from "../pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Library from "../pages/Library/Library";
import LikeVideo from "./LikedVideos/LikeVideo";
import YourVideos from "../pages/YourVideos/YourVideos";
import WatchHistory from "../pages/WatchHistory/WatchHistory";
import VideoPage from "../pages/VideoPage/VideoPage";
import WatchLater from "../pages/WatchLater/WatchLater";
import Channel from "../pages/Channel/Channel";
import Search from "../pages/Search/Search";
import Main from "../pages/Main/Main";
import OTPLogin from "../pages/OTP/OTPLogin";
import VideoCallPage from "../pages/VideoCall/VideoCallPage";
import { useSelector } from "react-redux";

function AllRoutes({ setEditCreateChannel, setVidUploadPage }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const [isCallAllowed, setIsCallAllowed] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours > 17 && hours < 24) {
        setIsCallAllowed(true);
      } else {
        setIsCallAllowed(false);
      }
    };

    checkTime();
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/search/:searchQuery" element={<Search />} />
      <Route path="/otp-verify" element={<OTPLogin />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            setVidUploadPage={setVidUploadPage}
            setEditCreateChannel={setEditCreateChannel}
          />
        }
      />
      {CurrentUser ? (
        <>
          <Route path="/library" element={<Library />} />
          <Route path="/yourvideos" element={<YourVideos />} />
          <Route path="/history" element={<WatchHistory />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/likedvideos" element={<LikeVideo />} />
          {isCallAllowed ? (
            <Route path="/video-call" element={<VideoCallPage />} />
          ) : (
            <Route path="/video-call" element={<Navigate to="/" />} />
          )}
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default AllRoutes;
