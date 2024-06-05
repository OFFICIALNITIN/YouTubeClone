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
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <h2 style={{ color: "white" }}>Search Results for {searchQuery}...</h2>
        <ShowVideoGrid Videos={Videos} />
      </div>
    </div>
  );
}

export default Search;
