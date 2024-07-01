import jwt from "jsonwebtoken";
import users from "../models/auth.js";
import nodemailer from "nodemailer";
import { Vonage } from "@vonage/server-sdk";
import NodeCache from "node-cache";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "emely69@ethereal.email",
    pass: "3QSMm4gRwKJTfrmCbH",
  },
});

const vonage = new Vonage({
  apiKey: "5aff6f05",
  apiSecret: "i1QJIrWQgl1WaSil",
});

//Initialize NodeCache
const otpCache = new NodeCache({ stdTTL: 300 });

export const login = async (req, res) => {
  const { email, phone } = req.body;
  console.log(phone);
  const { location } = req;
  console.log(location);

  // console.log(email);
  const existingUser = await users.findOne({ email });
  try {
    if (!existingUser) {
      try {
        const newUser = await users.create({ email });

        const token = jwt.sign(
          { email: newUser.email, id: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send OTP via selected method
        const otpMethod = await sendOTP(
          email,
          otp,
          location,
          existingUser,
          phone
        );
        otpCache.set(email, otp);

        res.status(200).json({
          result: newUser,
          token,
          otpMethod,
          message: `${otpMethod.toUpperCase()} OTP sent successfully`,
        });
      } catch (error) {
        res.status(500).json({ mess: "Something wents wrong..." });
      }
    } else {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const otp = Math.floor(100000 + Math.random() * 900000);

      const otpMethod = await sendOTP(
        email,
        otp,
        location,
        existingUser,
        phone
      );
      console.log(otpMethod);

      otpCache.set(email, otp);

      const currentTime = new Date().getHours();
      console.log(currentTime);
      const isSouthIndia = [
        "Tamil Nadu",
        "Kerala",
        "Karnataka",
        "Andhra Pradesh",
        "Telangana",
        "California",
      ].includes(location);

      // Theme determination
      const theme =
        currentTime >= 10 && currentTime < 12 && isSouthIndia ? "white" : "";

      res.status(200).json({
        result: existingUser,
        token,
        theme,
        otpMethod,
        message: `${otpMethod.toUpperCase()} OTP sent successfully`,
      });
    }
  } catch (error) {
    res.status(500).json({ mess: "something wents wrong..." });
  }
};

const sendOTP = async (email, otp, locaton, existingUser, phone) => {
  // Determine if user is in south India
  const isSouthIndia = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "California",
  ].includes(locaton);

  //OTP method determination
  const otpMethod = isSouthIndia ? "email" : "mobile";

  // Send OTP via selected method

  if (otpMethod === "email") {
    try {
      await transporter.sendMail({
        from: "emely69@ethereal.email",
        to: email,
        subject: "OTP for verification",
        text: `Your OTP for verification is ${otp}`,
      });
    } catch (error) {
      console.error("Error sending email OTP", error);
      throw new Error("Failed to send email OTP");
    }
  } else if (otpMethod === "mobile") {
    try {
      await vonage.sms
        .send({
          to: phone,
          from: "YouTube",
          text: `Your OTP verification is ${otp}`,
        })
        .then((response) => {
          console.log("Message sent successfully");
          console.log(response);
        })
        .catch((err) => {
          console.log("There was an error sending the message.");
          console.error(err);
        });
    } catch (error) {}
  }

  return otpMethod;
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);

  try {
    const cachedOTP = otpCache.get(email);

    if (!cachedOTP) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    // Verify OTP
    if (parseInt(otp) === cachedOTP) {
      //Generate JWT Token
      const user = await users.findOne(
        { email },
        {
          $set: { verified: true },
        },
        {
          new: true,
        }
      );

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "OTP verified successfully", token });
      console.log("OTP verified");
    } else {
      res.status(403).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};
