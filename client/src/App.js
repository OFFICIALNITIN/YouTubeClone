import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
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
import Main from "./pages/Main/Main";
import OTPLogin from "./pages/OTP/OTPLogin";

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
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const checkMaintenanceWindow = () => {
      const currentTimestamp = Date.now();
      const currentDate = new Date(currentTimestamp);
      const offset = currentDate.getTimezoneOffset();
      const localDate = new Date(currentTimestamp - offset);
      const currentTime = localDate.getHours();

      console.log(currentTime);

      if (currentTime >= 13 && currentTime < 14) {
        setIsMaintenance(true);
      } else {
        setIsMaintenance(false);
        // window.location.href = "/";
      }
    };

    checkMaintenanceWindow();
    const interval = setInterval(checkMaintenanceWindow, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);
  console.log(isMaintenance);
  if (isMaintenance) {
    return (
      <Router>
        <Routes>
          <Route path="/maintenance" element={<Main />} />
          <Route path="*" element={<Navigate to="/maintenance" />} />
        </Routes>
      </Router>
    );
  }
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
