import React, { useContext, useEffect } from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import "./showVideoGrid.css";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/SocketContext";

function ShowVideoGrid({ Videos }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const { videoCallOn, setVideoCallOn } = useContext(SocketContext);

  useEffect(() => {
    setVideoCallOn(false);
  }, [videoCallOn, setVideoCallOn]);

  return (
    <div className={`Container_ShowVideoGrid ${CurrentUser?.theme}`}>
      {Videos?.map((v) => {
        return (
          <div key={v?._id} className="video_box_app">
            <ShowVideo vid={v} />
          </div>
        );
      })}
    </div>
  );
}

export default ShowVideoGrid;
