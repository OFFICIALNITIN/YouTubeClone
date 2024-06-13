import React from "react";
import "./searchList.css";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function SearchList({ TitleArray, setSearchQuery }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  return (
    <>
      <div className={`Container_SearchList ${CurrentUser?.theme}`}>
        {TitleArray.map((m) => (
          <p key={m} className="titleItem" onClick={(e) => setSearchQuery(m)}>
            <FaSearch className="titleIcon" />
            {m}
          </p>
        ))}
      </div>
    </>
  );
}

export default SearchList;
