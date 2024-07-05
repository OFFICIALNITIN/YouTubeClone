import { io } from "socket.io-client";
import Peer from "simple-peer";
import { createContext, useEffect, useRef, useState } from "react";

const SocketContext = createContext();

const socket = io("https://youtubeclone-server-ozrg.onrender.com");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [userStream, setUserStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [recording, setRecording] = useState(false);
  const [mySocketId, setMySocketId] = useState("");
  const [userToCall, setUserToCall] = useState(""); // Store the ID of the user to call

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);
  const userMediaRecorder = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", (id) => setMe(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  // Function to handle userVideo stream
  const handleUserStream = (stream) => {
    setUserStream(stream);
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  };

  const startRecordingUserVideo = () => {
    if (userStream) {
      const options = { mimeType: "video/webm; codecs=vp9" };
      const mediaRecorder = new MediaRecorder(userStream, options);
      userMediaRecorder.current = mediaRecorder;
      const recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "userRecording.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      console.log("Recording userVideo started");
    } else {
      console.error("User video stream is not initialized.");
    }
  };

  const stopRecordingUserVideo = () => {
    if (
      userMediaRecorder.current &&
      userMediaRecorder.current.state === "recording"
    ) {
      userMediaRecorder.current.stop();
      console.log("Recording userVideo stopped");
    } else {
      console.error("No active recording for userVideo.");
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      handleUserStream(currentStream);
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  };

  const startScreenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((screenStream) => {
        const screenTrack = screenStream.getVideoTracks()[0];
        const combinedStream = new MediaStream([
          screenTrack,
          stream.getAudioTracks()[0], // Ensure you get the audio track from the existing stream
        ]);
        setStream(combinedStream);

        if (myVideo.current) {
          myVideo.current.srcObject = combinedStream;
        }

        // Replace track in the Peer instance
        if (connectionRef.current) {
          connectionRef.current.replaceTrack(screenTrack);
        } else {
          console.error("No active Peer connection.");
        }
      })
      .catch((error) => console.error("Error accessing screen share:", error));
  };

  const stopScreenShare = () => {
    const videoTrack = stream.getVideoTracks()[0]; // Get the original video track
    setStream(new MediaStream([videoTrack])); // Restore the original stream

    if (myVideo.current) {
      myVideo.current.srcObject = new MediaStream([videoTrack]); // Update video element
    }

    // Replace track in the Peer instance
    if (connectionRef.current) {
      connectionRef.current.replaceTrack(videoTrack);
    } else {
      console.error("No active Peer connection.");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        startRecordingUserVideo,
        stopRecordingUserVideo,
        recording,
        startScreenShare,
        stopScreenShare,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
