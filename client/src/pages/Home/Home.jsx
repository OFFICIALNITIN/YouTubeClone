import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import vid from "../../components/Videos/vid.mp4";
import { useSelector } from "react-redux";
import "./home.css";

function Home() {
  const Videos = useSelector((state) => state.videoReducer)
    ?.data?.filter((q) => q)
    .reverse();
  // const Videos = [
  //   {
  //     _id: 1,
  //     video_src: vid,
  //     Channal: "484vnsnsi858ndsks9505la",
  //     title: "video 1",
  //     uploader: "abc",
  //     description: "description of video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid,
  //     Channal: "74ncnokjvwnonw09mowin0990",
  //     title: "video 2",
  //     uploader: "abc",
  //     description: "description of video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid,
  //     Channal: "47bofo89484nfon948n",
  //     title: "video 3",
  //     uploader: "abc",
  //     description: "description of video 3",
  //   },
  // ];
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  console.log(CurrentUser);
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
        <ShowVideoGrid Videos={Videos} />
      </div>
    </div>
  );
}

export default Home;
