import React, { useState } from "react";
import "./videoUpload.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../actions/video";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

function VideoUpload({ setVidUploadPage }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState("");

  const [progress, setProgress] = useState(0);

  const handleSetVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const fileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(function () {}, 3000);
        setVidUploadPage(false);
      }
    },
  };

  const uploadVideoFile = () => {
    if (!title) {
      alert("Plz Enter a title of the video");
    } else if (!videoFile) {
      alert("Plz Attach  video File");
    } else if (videoFile.size > 50000000) {
      alert("Plz Attach video file less than 50MB");
    } else {
      const fileData = new FormData();

      fileData.append("file", videoFile);
      fileData.append("title", title);
      fileData.append("channel", CurrentUser?.result._id);
      fileData.append("Uploader", CurrentUser?.result.name);

      dispatch(
        uploadVideo({
          fileData: fileData,
          fileOptions: fileOptions,
        })
      );
    }
  };
  return (
    <div className="container_VidUpload">
      <input
        type="submit"
        name="text"
        value={"X"}
        className="ibtn_x"
        onClick={() => setVidUploadPage(false)}
      />
      <div className="container2_VidUpload">
        <div className="ibox_div_videoupload">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="ibox_videoupload"
            maxLength={30}
            placeholder="Enter title of your video"
          />
          <label htmlFor="file" className="ibox_videoupload btn_vidUpload">
            <input
              type="file"
              name="file"
              className="ibox_videoupload"
              id=""
              style={{ fontSize: "1rem" }}
              onChange={(e) => {
                handleSetVideoFile(e);
              }}
            />
          </label>
        </div>
        <div className="ibox_div_videoupload">
          <input
            onClick={() => uploadVideoFile()}
            type="submit"
            value="Upload"
            className="ibox_videoupload btn_vidUpload"
          />
        </div>
        <div className="loader ibox_div_videoupload ">
          <CircularProgressbar
            value={progress}
            text={`${progress}`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "20px",
              pathTransitionDuration: 0.5,
              pathColor: `rgba(255,255,255,${progress / 100})`,
              textColor: "#f88",
              trailColor: "#adff2f",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoUpload;
