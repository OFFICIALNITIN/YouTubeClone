import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const login = (authData) => async (dispatch) => {
  const item = JSON.parse(localStorage.getItem("Profile"));
  try {
    // Check if the location is not in South India
    const isSouthIndia = [
      "Tamil Nadu",
      "Kerala",
      "Karnataka",
      "Andhra Pradesh",
      "Telangana",
      "California",
    ].includes(authData.location);

    if (!isSouthIndia && !item.result.verified) {
      const phone = prompt("Please enter your mobile number include(91):");
      if (!phone) {
        alert("Mobile number is required for OTP verification.");
        return;
      }
      authData.phone = phone;
    }
    const res = await api.login(authData);
    console.log(res);
    const data = res.data;
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  } catch (error) {
    alert(error);
  }
};

// export const verify = (otpData) => async (dispatch) => {
//   const { email, otp } = otpData;
//   try {
//     const res = await api.verify(email, otp);
//     const data = res.data.message;
//     console.log(data);
//     dispatch({ type: "VERIFY", data });
//   } catch (error) {
//     console.log(error);
//   }
// };
