import React from "react";
import vid from "../../components/Videos/vid.mp4";
import WHL from "../../components/WHL/WHL";
import { useSelector } from "react-redux";

function WatchLater() {
  const watchLaterList = useSelector((state) => state.watchLaterReducers);

  return <WHL page={"Watch Later"} likedVideoList={watchLaterList} />;
}

export default WatchLater;
