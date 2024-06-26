import React, { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const VideoCallNotification = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className="noti-content">
          <h3>{call.name} is calling:</h3>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </>
  );
};

export default VideoCallNotification;
