import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createEditChannel.css";
import { login } from "../../actions/auth";
import { updateChannelData } from "../../actions/channelUser";

function CreateEditChannel({ setEditCreateChannel }) {
  // const CurrentUser = {
  //   result: {
  //     email: "xyx@gmail.com",
  //     joinedOn: "2222-07-15T09:57:23.489Z",
  //   },
  // };
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const [name, setname] = useState(CurrentUser?.result.name);
  const [desc, setdesc] = useState(CurrentUser?.result.desc);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!name) {
      alert("plz Enter Name!");
    } else if (!desc) {
      alert("Plz enter Discription!");
    } else {
      dispatch(
        updateChannelData(CurrentUser?.result._id, {
          name: name,
          desc: desc,
        })
      );
      setEditCreateChannel(false);
      setTimeout(() => {
        dispatch(login({ email: CurrentUser?.result.email }));
      }, 5000);
    }
  };
  return (
    <div className="container_createEditChannel">
      <input
        type="submit"
        name="text"
        value={"X"}
        onClick={() => setEditCreateChannel(false)}
        className="ibtn_x"
      />
      <div className="container2_createEditChannel">
        <h1>
          {CurrentUser?.result.name ? <>Edit</> : <>Create</>}
          Your Channal
        </h1>
        <input
          type="text"
          placeholder="Enter Your / Channel Name"
          className="ibox"
          name="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <textarea
          type="text"
          rows={15}
          placeholder={"Enter Channel Description"}
          className={"ibox"}
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <input
          type="submit"
          value={"Submit"}
          className="ibtn"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateEditChannel;
