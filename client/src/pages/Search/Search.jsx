import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Search() {
  const { searchQuery } = useParams();
  const Videos = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) =>
      q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())
    )
    .reverse();
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  return (
    <div className={`container_Pages_App ${CurrentUser?.theme}`}>
      <LeftSidebar />
      <div className="container2_Pages_App">
        <h2>Search Results for {searchQuery}...</h2>
        <ShowVideoGrid Videos={Videos} />
      </div>
    </div>
  );
}

export default Search;
