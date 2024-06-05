import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import vid from "../../components/Videos/vid.mp4";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import DescribeChannel from "./DescribeChannel";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Channel({ setEditCreateChannel, setVidUploadPage }) {
  const { cid } = useParams();

  const Videos = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q?.videoChannel === cid)
    .reverse();
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <DescribeChannel
          cid={cid}
          setVidUploadPage={setVidUploadPage}
          setEditCreateChannel={setEditCreateChannel}
        />
        <ShowVideoGrid Videos={Videos} />
      </div>
    </div>
  );
}

export default Channel;
