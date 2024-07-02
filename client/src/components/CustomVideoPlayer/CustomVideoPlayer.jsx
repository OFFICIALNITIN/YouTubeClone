import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./CustomVideoPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faCompress,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CustomVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [maxDuration, setMaxDuration] = useState("00:00");
  const [locationTemp, setLocationTemp] = useState("");
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [showcomments, setShowComments] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { vid } = useParams();
  const Videos = useSelector((state) => state.videoReducer);
  const vv = Videos?.data.find((q) => q._id === vid);
  const commentList = useSelector((state) => state.commentReducer);
  console.log(Videos);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(formatTime(video.currentTime));
    setMaxDuration(formatTime(video.duration));
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const formatTime = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  const handleVolumeChange = (event) => {
    const video = videoRef.current;
    const newVolume = event.target.value;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const handleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setVolume(video.muted ? 0 : video.volume);
  };

  const handleMouseClick = async (e) => {
    const now = Date.now();
    console.log("last tap" + lastTap);
    const timeSinceLastTap = now - lastTap;
    console.log("new tap" + timeSinceLastTap);

    if (timeSinceLastTap < 800) {
      setTapCount((prevCount) => prevCount + 1);
    } else {
      setTapCount(1); // Reset to 1 if it's a new sequence of taps
    }

    setLastTap(now);

    const videoRect = videoRef.current.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;

    const clickOnRight = clickX > (videoRect.width * 2) / 3;
    const clickOnLeft = clickX < videoRect.width / 3;
    const clickOnMiddle = !clickOnRight && !clickOnLeft;
    const clickOnTopRight =
      clickX > (videoRect.width * 2) / 3 && clickY < videoRect.height / 3;

    console.log(tapCount);

    setTimeout(() => {
      if (tapCount === 3) {
        if (clickOnMiddle) {
          alert("Next video");
        } else if (clickOnRight) {
          window.close();
        } else if (clickOnLeft) {
          setShowComments(true);
        }
        setTapCount(0);
      } else if (tapCount === 2) {
        if (clickOnRight) {
          handleSkip(10);
        } else if (clickOnLeft) {
          handleSkip(-10);
        }
        setTapCount(0);
      } else if (tapCount === 1) {
        if (clickOnMiddle) {
          togglePlayPause();
        } else if (clickOnTopRight) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const geocodingResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=8b7887dbe77242d79dfc6c549329ae97`
              );
              const placeName = geocodingResponse.data.results[0].formatted;

              const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1c86a55ad041297a64544ba7c3f2d094`
              );
              const temperature =
                (weatherResponse.data.main.temp - 273.15).toFixed(2) + "°C";

              setLocationTemp(`Location: ${placeName} Temp: ${temperature}`);
            } catch (error) {
              console.error("Error fetching location or weather data", error);
              setLocationTemp("Error fetching location or weather data");
            }
          });
        }
      }
    }, 300); // Delay to allow for potential third tap
  };

  const handleMouseDown = (e) => {
    const clickX = e.clientX;
    const videoRect = videoRef.current.getBoundingClientRect();

    const holdOnRight = clickX > (videoRect.width * 2) / 3;
    const holdOnLeft = clickX < videoRect.width / 3;

    setHoldTimeout(
      setTimeout(() => {
        const video = videoRef.current;
        if (holdOnRight) {
          video.playbackRate = 2.0;
        } else if (holdOnLeft) {
          video.playbackRate = 0.5;
        }
      }, 500)
    );
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimeout);
    const video = videoRef.current;
    video.playbackRate = 1.0;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;

    if (!isFullscreen) {
      // If not in fullscreen, request fullscreen
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        /* Firefox */
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        /* IE/Edge */
        video.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // If already in fullscreen, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      className="video-container"
      onClick={handleMouseClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <video
        className="video"
        ref={videoRef}
        width="600"
        height="400"
        controls={false}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="controls">
        <div className="left">
          <button onClick={() => handleSkip(-10)}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={togglePlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={() => handleSkip(10)}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        <div className="video-timer">
          <span id="current-time">{currentTime}</span>
          <span id="separator">/</span>
          <span id="max-duration">{maxDuration}</span>
        </div>
        <div className="playback-line">
          <div
            className="progress-bar"
            style={{
              width: `${
                (videoRef.current?.currentTime / videoRef.current?.duration) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div className="right">
          <button onClick={toggleFullscreen}>
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
          <div className="volume-container">
            <div id="mute" onClick={handleMute}>
              <FontAwesomeIcon
                icon={volume === 0 ? faVolumeMute : faVolumeUp}
              />
            </div>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
      {locationTemp && <div className="notification">{locationTemp}</div>}

      {showcomments && (
        <div className="comments">
          {commentList?.data
            ?.filter((q) => vv?._id === q?.videoId)
            .reverse()
            .map((m) => {
              console.log(m);
              return <p key={m._id}>{m.commentBody}</p>;
            })}
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
