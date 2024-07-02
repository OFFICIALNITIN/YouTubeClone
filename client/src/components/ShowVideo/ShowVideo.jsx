import React from "react";
import "./showVideo.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

function ShowVideo({ vid }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  return (
    <>
      <Link to={`/videopage/${vid?._id}`}>
        <video
          src={`https://youtubeclone-server-ozrg.onrender.com/${vid.filePath}`}
          className="video_ShowVideo"
        />
      </Link>
      <div className={`video_description ${CurrentUser?.theme}`}>
        <div className="Channel_logo_App">
          <div className="fstChar_logo_App">
            <>{vid?.uploader?.charAt(0).toUpperCase()}</>
          </div>
        </div>
        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.videoTitle}</p>
          <pre className="vid_views_UploadTime">{vid.Uploader}</pre>
          <pre className="vid_views_UploadTime">
            {vid.Views} views <div className="dot"></div>
            {moment(vid?.createdAt).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
}

export default ShowVideo;
