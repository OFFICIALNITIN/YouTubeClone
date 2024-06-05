import React from "react";
import ShowVideo from "../ShowVideo/ShowVideo";
import "./showVideoGrid.css";

function ShowVideoGrid({ Videos }) {
  return (
    <div className="Container_ShowVideoGrid">
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
