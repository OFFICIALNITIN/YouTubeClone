import React, { useEffect } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./describeChannel.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserPoints } from "../../actions/points.js";

const DescribeChannel = ({ setEditCreateChannel, cid, setVidUploadPage }) => {
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const channels = useSelector((state) => state.channelReducers);
  const currentChannel = channels?.filter((c) => c._id === cid)[0];
  const Points = useSelector((state) => state.pointsReducer);

  useEffect(() => {
    if (CurrentUser?.result._id) {
      dispatch(getUserPoints({ userId: CurrentUser?.result._id }));
    }
  }, []);

  console.log(Points);

  return (
    <div className={`container3_channel ${CurrentUser?.theme}`}>
      <div className="channel_logo_channel">
        <b>{currentChannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_channel">
        <b>{currentChannel?.name}</b>
        <p>{currentChannel?.desc}</p>
        <p>Points :{Points.points}</p>
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
};

export default DescribeChannel;
