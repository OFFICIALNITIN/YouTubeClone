import jwt from "jsonwebtoken";
import users from "../models/auth.js";

export const login = async (req, res) => {
  const { email } = req.body;
  const { location } = req;
  console.log(location);

  // console.log(email);
  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      try {
        const newUser = await users.create({ email });

        const token = jwt.sign(
          { email: newUser.email, id: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({ result: newUser, token });
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

      //check the maintenance period
      if (currentTime >= 13 && currentTime < 14) {
        return res.status(503).json({
          message: "Website is under maintenance from 1 PM to 2 PM",
        });
      }

      // Theme determination
      const theme =
        currentTime >= 10 && currentTime < 12 && isSouthIndia ? "white" : "";

      //otp logic
      const otpMethod = isSouthIndia ? "email" : "mobile";

      res.status(200).json({ result: existingUser, token, theme, otpMethod });
    }
  } catch (error) {
    res.status(500).json({ mess: "something wents wrong..." });
  }
};
