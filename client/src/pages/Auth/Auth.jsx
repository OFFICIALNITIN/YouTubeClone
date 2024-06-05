import React from "react";
import { BiLogOut } from "react-icons/bi";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import "./Auth.css";
import { setCurrentUser } from "../../actions/currentUser";
import { Link } from "react-router-dom";

function Auth({ User, setAuthBtn, setEditCreateChannel }) {
  const dispatch = useDispatch();
  const logout = () => {
    googleLogout();
    dispatch(setCurrentUser(null));
    alert("Logged Out Successfully");
  };
  return (
    <div className="Auth_container" onClick={() => setAuthBtn(false)}>
      <div className="Auth_Container2">
        <p className="User_Details">
          <div className="Channel_logo_App">
            <p className="fstChar_logo_App">
              {User?.result.name ? (
                <>{User?.result.name.charAt(0).toUpperCase()}</>
              ) : (
                <>{User?.result.email.charAt(0).toUpperCase()}</>
              )}
            </p>
          </div>
          <div className="email_Auth">{User?.result.email}</div>
        </p>
        <div className="btns_Auth">
          {User?.result.name ? (
            <>
              {
                <Link to={`/channel/${User?.result._id}`} className="btn_Auth">
                  Your Channel
                </Link>
              }
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn_Auth"
                value="Create Your Channel"
                onClick={() => setEditCreateChannel(true)}
              />
            </>
          )}

          <div onClick={logout} className="btn_Auth">
            <BiLogOut />
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;