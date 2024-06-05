import React, { useEffect } from "react";
import moment from "moment";
import "./videoPage.css";
import LikeWatchLaterSaveButton from "./LikeWatchLaterSaveButton";
import Comments from "../../components/comments/Comments";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";

function VideoPage() {
  const dispatch = useDispatch();
  const { vid } = useParams();
  const Videos = useSelector((state) => state.videoReducer);
  const vv = Videos?.data.filter((q) => q._id === vid)[0];
  // const channels = useSelector((state) => state.channelReducers);
  // const currentChannel = channels?.filter((c) => c._id === vid)[0];
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const handeHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };

  const handleViews = () => {
    dispatch(
      viewVideo({
        id: vid,
      })
    );
  };
  useEffect(() => {
    if (CurrentUser) {
      handeHistory();
    }
    handleViews();
  }, []);
  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videopage">
          <div className="video_display_screen_videoPage">
            <video
              src={`http://localhost:8000/${vv?.filePath}`}
              className={"video_ShowVideo_videoPage"}
              controls
              // autoPlay
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveButton vid={vid} vv={vv} />
                </div>
              </div>
              <Link
                to={`/channel/${vv?.videoChannel}`}
                className="channel_details_videoPage"
              >
                <b className="channel_logo_videoPage">
                  <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
                </b>
                <p className="channel_name_videoPage">{vv.Uploader}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv._id} />
              </div>
            </div>
          </div>
        </div>
        <div className="moreVideoBar">More Videos</div>
      </div>
    </>
  );
}

export default VideoPage;
