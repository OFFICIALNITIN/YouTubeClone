import React, { useState } from "react";
import * as api from "../../api";
// import { useDispatch } from "react-redux";
import "./OTPLogin.css";
import axios from "axios";

const OTPLogin = ({ email, otpMethod, setVerified, message }) => {
  const [Phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpData, setOtpData] = useState("");

  //   const dispatch = useDispatch();

  const handleVerifyOTP = async () => {
    // dispatch(
    //   verify({
    //     email: email,
    //     otp: otp,
    //   })
    // );
    try {
      console.log(email, otp);
      const res = await api.verify(email, otp);
      const checkVerified = res.data.user.verified;
      const data = res.data.message;
      setOtpData(data);
      if (checkVerified === true) {
        setTimeout(() => {
          setVerified(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="otp">
      <div className="otp-container">
        <h3>{message}</h3>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
        <p className="output">{otpData}</p>
      </div>
    </div>
  );
};

export default OTPLogin;
