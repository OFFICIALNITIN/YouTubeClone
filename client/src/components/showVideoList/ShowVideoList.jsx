import React from "react";
import vid from "../../components/Videos/vid.mp4";
import ShowVideo from "../ShowVideo/ShowVideo";
import { useSelector } from "react-redux";

function ShowVideoList({ videoId }) {
  const Videos = useSelector((s) => s.videoReducer);
  // console.log(Videos);
  // const Videos = [
  //   {
  //     _id: 1,
  //     video_src: vid,
  //     Channal: "484vnsnsi858ndsks9505la",
  //     title: "video 1",
  //     uploader: "abc",
  //     description: "description of video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid,
  //     Channal: "74ncnokjvwnonw09mowin0990",
  //     title: "video 2",
  //     uploader: "abc",
  //     description: "description of video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid,
  //     Channal: "47bofo89484nfon948n",
  //     title: "video 3",
  //     uploader: "abc",
  //     description: "description of video 3",
  //   },
  // ];
  return (
    <div className="Container_ShowVideoGrid">
      {Videos?.data
        ?.filter((q) => q._id === videoId)
        .map((v) => {
          return (
            <div key={v._id} className="video_box_app">
              <ShowVideo vid={v} />
            </div>
          );
        })}
    </div>
  );
}

export default ShowVideoList;
