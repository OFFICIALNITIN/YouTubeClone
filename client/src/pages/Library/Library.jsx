import React from "react";
import vid from "../../components/Videos/vid.mp4";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import { FaHistory } from "react-icons/fa";
import "./library.css";
import WHLVideoList from "../../components/WHL/WHLVideoList";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";

function Library() {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  const watchLaterList = useSelector((state) => state.watchLaterReducers);
  const historyList = useSelector((state) => state.HistoryReducer);

  return (
    <div className={`container_Pages_App ${CurrentUser?.theme}`}>
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <FaHistory />
            </b>
            <b>History</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"History"}
              likedVideoList={historyList}
              CurrentUser={CurrentUser?.result._id}
            />
          </div>
        </div>
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <MdOutlineWatchLater />
            </b>
            <b>Watch Later</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"Watch Later"}
              likedVideoList={watchLaterList}
              CurrentUser={CurrentUser?.result._id}
            />
          </div>
        </div>
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <AiOutlineLike />
            </b>
            <b>Liked Videos</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"Liked Videos"}
              likedVideoList={likedVideoList}
              CurrentUser={CurrentUser?.result._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
