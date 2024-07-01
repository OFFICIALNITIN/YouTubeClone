import React, { useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import vid from "../../components/Videos/vid.mp4";
import { useSelector } from "react-redux";
import "./home.css";
import OTPLogin from "../OTP/OTPLogin";

function Home() {
  const Videos = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q)
    .reverse();
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const [verified, setVerified] = useState(false);

  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
  ];
  return (
    <div className={`container_Pages_App ${CurrentUser?.theme}`}>
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className={`navigation_Home ${CurrentUser?.theme}`}>
          {NavList.map((m) => {
            return (
              <p key={m} className="btn_nav_home">
                {m}
              </p>
            );
          })}
        </div>
        {CurrentUser && !CurrentUser?.result?.verified && !verified && (
          <OTPLogin
            email={CurrentUser?.result?.email}
            otpMethod={CurrentUser?.otpMethod}
            setVerified={setVerified}
            message={CurrentUser?.message}
          />
        )}

        <ShowVideoGrid Videos={Videos} />
      </div>
    </div>
  );
}

export default Home;
