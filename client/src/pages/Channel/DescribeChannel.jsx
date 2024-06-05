import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./describeChannel.css";
import { useSelector } from "react-redux";

function DescribeChannel({ setEditCreateChannel, cid, setVidUploadPage }) {
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const channels = useSelector((state) => state.channelReducers);
  const currentChannel = channels?.filter((c) => c._id === cid)[0];

  return (
    <div className="container3_channel">
      <div className="channel_logo_channel">
        <b>{currentChannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_channel">
        <b>{currentChannel?.name}</b>
        <p>{currentChannel?.desc}</p>
      </div>
      {CurrentUser?.result._id === currentChannel?._id && (
        <>
          <p
            className="editbtn_channel"
            onClick={() => setEditCreateChannel(true)}
          >
            <FaEdit />
            <b>Edit Channel</b>
          </p>
          <p
            className="uploadbtn_channel"
            onClick={() => setVidUploadPage(true)}
          >
            <FaUpload />
            <b>Upload Video</b>
          </p>
        </>
      )}
    </div>
  );
}

export default DescribeChannel;
