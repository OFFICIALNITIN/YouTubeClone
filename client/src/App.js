import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import DrawerSidebar from "./components/LeftSideBar/DrawerSidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateEditChannel from "./pages/Channel/CreateEditChannel";
import { fetchAllChannel } from "./actions/channelUser";
import VideoUpload from "./pages/VideoUpload/VideoUpload";
import { getVideos } from "./actions/video";
import { getAllLikedVideos } from "./actions/likedVideo";
import { getAllWatchLater } from "./actions/watchLater";
import { getAllHistory } from "./actions/History";
import { getAllComment } from "./actions/comment";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllChannel());
    dispatch(getVideos());
    dispatch(getAllLikedVideos());
    dispatch(getAllWatchLater());
    dispatch(getAllHistory());
    dispatch(getAllComment());
  }, [dispatch]);
  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  });
  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setToggleDrawerSidebar({
        display: "flex",
      });
    } else {
      setToggleDrawerSidebar({
        display: "none",
      });
    }
  };
  const [VidUploadPage, setVidUploadPage] = useState(false);
  const [EditCreateChannel, setEditCreateChannel] = useState(false);
  return (
    <Router>
      {VidUploadPage && <VideoUpload setVidUploadPage={setVidUploadPage} />}
      {EditCreateChannel && (
        <CreateEditChannel setEditCreateChannel={setEditCreateChannel} />
      )}
      <Navbar
        setEditCreateChannel={setEditCreateChannel}
        toggleDrawer={toggleDrawer}
      />
      <DrawerSidebar
        toggleDrawer={toggleDrawer}
        toggleDrawerSidebar={toggleDrawerSidebar}
      />
      <AllRoutes
        setVidUploadPage={setVidUploadPage}
        setEditCreateChannel={setEditCreateChannel}
      />
    </Router>
  );
}

export default App;
