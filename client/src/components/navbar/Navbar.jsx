import React, { useState } from "react";
import "./navbar.css";
import logo from "./youtube.png";
import SearchBar from "../SearchBar/SearchBar";
import { useGoogleLogin } from "@react-oauth/google";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../pages/Auth/Auth";

function Navbar({ toggleDrawer, setEditCreateChannel }) {
  const [AuthBtn, setAuthBtn] = useState(false);
  // const CurrentUser = null;
  // const CurrentUser = {
  //   result: {
  //     email: "xyx@gmail.com",
  //     joinedOn: "2222-07-15T09:57:23.489Z",
  //   },
  // };
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const onSuccess = async (response) => {
    const access_token = response.access_token;
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );
      const Profile = await res.json();
      const Email = Profile.email;
      dispatch(login({ email: Email }));
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (response) => {
    console.log("Failed", response);
  };

  const Login = useGoogleLogin({
    onSuccess,
    onError,
  });
  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={"/"} className="logo_div_navbar">
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", display: "flex", margin: "6px" }}
            />
            <p className="logo_title_navbar">YouTube</p>
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        <div className="apps_box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="Auth_cont_Navbar">
          {CurrentUser ? (
            <>
              <div
                className="Channel_logo_App"
                onClick={() => setAuthBtn(true)}
              >
                <p className="fstChar_logo_App">
                  {CurrentUser?.result?.email ? (
                    <>{CurrentUser?.result?.email.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{CurrentUser?.result?.name.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <p onClick={Login} className="Auth_Btn">
                <BiUserCircle className="AuthIcon" size={22} />
                <b>Sign In</b>
              </p>
            </>
          )}
        </div>
      </div>
      {AuthBtn && (
        <Auth
          setAuthBtn={setAuthBtn}
          User={CurrentUser}
          setEditCreateChannel={setEditCreateChannel}
        />
      )}
    </>
  );
}

export default Navbar;
