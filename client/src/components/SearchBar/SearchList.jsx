import React from "react";
import "./searchList.css";
import { FaSearch } from "react-icons/fa";

function SearchList({ TitleArray, setSearchQuery }) {
  return (
    <>
      <div className="Container_SearchList">
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
