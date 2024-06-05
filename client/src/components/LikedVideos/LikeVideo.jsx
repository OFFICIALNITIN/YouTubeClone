import React from "react";
import WHL from "../WHL/WHL";
import { useSelector } from "react-redux";

function LikeVideo() {
  const likedVideoList = useSelector((state) => state.likedVideoReducer);

  return <WHL page={"Like Videos"} likedVideoList={likedVideoList} />;
}

export default LikeVideo;
