import React, { useEffect, useState } from "react";
import "./likeWatchLaterSaveButton.css";
import { BsThreeDots } from "react-icons/bs";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
} from "react-icons/ri";
import { likeVideo } from "../../actions/video";
import { addToLikedVideo, deleteLikedVideos } from "../../actions/likedVideo";
import { addToWatchLater, deleteWatchLater } from "../../actions/watchLater";

function LikeWatchLaterSaveButton({ vv, vid }) {
  const [saveVideo, setSaveVideo] = useState(false);
  const [DislikeBtn, setDislikeBtn] = useState(false);
  const [LikeBtn, setLikeBtn] = useState(false);
  const dispatch = useDispatch();

  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  const watchLaterList = useSelector((state) => state.watchLaterReducers);

  useEffect(() => {
    likedVideoList?.data
      ?.filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setLikeBtn(true));

    watchLaterList?.data
      ?.filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setSaveVideo(true));
  }, []);

  const toggleSaveVideo = () => {
    if (CurrentUser) {
      if (saveVideo) {
        setSaveVideo(false);
        dispatch(
          deleteWatchLater({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
      } else {
        setSaveVideo(true);
        dispatch(
          addToWatchLater({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
      }
    } else {
      alert("Please Login to save the video");
    }
  };

  const toggleLikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (LikeBtn) {
        setLikeBtn(false);
        dispatch(
          likeVideo({
            id: vid,
            Like: lk - 1,
          })
        );
        dispatch(
          deleteLikedVideos({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
      } else {
        setLikeBtn(true);
        dispatch(
          likeVideo({
            id: vid,
            Like: lk + 1,
          })
        );
        dispatch(
          addToLikedVideo({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );

        setDislikeBtn(false);
      }
    } else {
      alert("Plz Login To give a like");
    }
  };

  const toggleDislikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (DislikeBtn) {
        setDislikeBtn(false);
      } else {
        setDislikeBtn(true);
        if (LikeBtn) {
          dispatch(
            likeVideo({
              id: vid,
              Like: lk - 1,
            })
          );
          dispatch(
            deleteLikedVideos({
              videoId: vid,
              Viewer: CurrentUser?.result._id,
            })
          );
        }
        setLikeBtn(false);
      }
    } else {
      alert("Plz Login To give a like");
    }
  };
  return (
    <div className="btns_cont_videPage">
      <div className="btn_videoPage">
        <BsThreeDots />
      </div>
      <div className="btn_videoPage">
        <div
          className="like_videoPage"
          onClick={(e) => toggleLikeBtn(e, vv?.Like)}
        >
          {LikeBtn ? (
            <>
              <AiFillLike size={22} className="btns_VideoPage" />
            </>
          ) : (
            <>
              <AiOutlineLike size={22} className="btns_VideoPage" />
            </>
          )}
          <b>{vv?.Like}</b>
        </div>
        <div
          className="like_videoPage"
          onClick={(e) => toggleDislikeBtn(e, vv?.Like)}
        >
          {DislikeBtn ? (
            <>
              <AiFillDislike size={22} className="btns_VideoPage" />
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} className="btns_VideoPage" />
            </>
          )}
          <b>DISLIKE</b>
        </div>
        <div className="like_videoPage" onClick={() => toggleSaveVideo()}>
          {saveVideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_VideoPage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_VideoPage" />
              <b>Save</b>
            </>
          )}
        </div>
        <div className="like_videoPage">
          <RiHeartAddFill size={22} className="btns_VideoPage" />
          <b>Thanks</b>
        </div>
        <div className="like_videoPage">
          <RiShareForwardLine size={22} className="btns_VideoPage" />
          <b>Share</b>
        </div>
      </div>
    </div>
  );
}

export default LikeWatchLaterSaveButton;
