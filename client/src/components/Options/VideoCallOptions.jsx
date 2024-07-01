import React, { useContext, useState } from "react";
import "./VideoCallOptions.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { SocketContext } from "../../context/SocketContext";

const VideoCallOptions = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    startRecordingUserVideo,
    stopRecordingUserVideo,
    startScreenShare,
    stopScreenShare,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <div className="options-container">
      <div className="main-container">
        <div className="form">
          <div className="part-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <CopyToClipboard text={me}>
              <button>
                <AssignmentIcon />
              </button>
            </CopyToClipboard>
          </div>
          <div className="part-2">
            <label htmlFor="idToCall">ID to Call</label>
            <input
              type="text"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />{" "}
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>
                <PhoneDisabledIcon /> Hang Up
              </button>
            ) : (
              <button onClick={() => callUser(idToCall)}>
                <LocalPhoneIcon /> Call
              </button>
            )}
          </div>
          <div className="part-3">
            <button onClick={startRecordingUserVideo}>Start Recording</button>
            <button onClick={stopRecordingUserVideo}>Stop Recording</button>
            <button onClick={startScreenShare}>Screen Share</button>
            <button onClick={stopScreenShare}> Stop Screen Share</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default VideoCallOptions;
