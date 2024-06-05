import React from "react";
import vid from "../../components/Videos/vid.mp4";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import { useSelector } from "react-redux";
import "./yourVideos.css";
function YourVideos() {
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const Videos = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q?.videoChannel === CurrentUser?.result?._id)
    .reverse();
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="container_yourvideo">
          <h1>Your Videos</h1>
          {CurrentUser ? (
            <>
              <ShowVideoGrid Videos={Videos} />
            </>
          ) : (
            <>
              <h3>Please login to see your uploaded videos</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourVideos;
