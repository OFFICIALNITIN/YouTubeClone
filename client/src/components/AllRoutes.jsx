import React from "react";
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Library from "../pages/Library/Library";
import LikeVideo from "./LikedVideos/LikeVideo";
import YourVideos from "../pages/YourVideos/YourVideos";
import WatchHistory from "../pages/WatchHistory/WatchHistory";
import VideoPage from "../pages/VideoPage/VideoPage";
import WatchLater from "../pages/WatchLater/WatchLater";
import Channel from "../pages/Channel/Channel";
import Search from "../pages/Search/Search";
import Main from "../pages/Main/Main";

function AllRoutes({ setEditCreateChannel, setVidUploadPage }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/yourvideos" element={<YourVideos />} />
      <Route path="/history" element={<WatchHistory />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/likedvideos" element={<LikeVideo />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/search/:searchQuery" element={<Search />} />
      <Route path="/maintenance" element={<Main />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            setVidUploadPage={setVidUploadPage}
            setEditCreateChannel={setEditCreateChannel}
          />
        }
      />
    </Routes>
  );
}

export default AllRoutes;
