import React from "react";
import WHL from "../../components/WHL/WHL";
import { useSelector } from "react-redux";

function WatchHistory() {
  const historyList = useSelector((state) => state.HistoryReducer);

  return <WHL page={"History"} likedVideoList={historyList} />;
}

export default WatchHistory;
