import React from "react";
import ShowVideoList from "../showVideoList/ShowVideoList";

function WHLVideoList({ page, CurrentUser, likedVideoList }) {
  return (
    <>
      {CurrentUser ? (
        <>
          {likedVideoList?.data
            ?.filter((q) => q?.Viewer === CurrentUser)
            .reverse()
            .map((m) => {
              return (
                <>
                  <ShowVideoList videoId={m?.videoId} key={m?.videoId} />
                </>
              );
            })}
        </>
      ) : (
        <>
          <h2 style={{ color: "white" }}>Please Login To Watch Your History</h2>
        </>
      )}
    </>
  );
}

export default WHLVideoList;
