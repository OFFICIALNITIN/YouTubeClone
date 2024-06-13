import React from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import "./showVideoGrid.css";
import { useSelector } from "react-redux";

function ShowVideoGrid({ Videos }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);

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
