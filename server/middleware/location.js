import axios from "axios";

const getLocation = async (req, res, next) => {
  let ip = req.ip;

  if (ip === "::1" || ip === "127.0.0.1") {
    ip = "8.8.8.8";
  }
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json`);
    req.location = response.data.region;
    next();
  } catch (error) {
    console.error("Failed to fetch location", error);
    next();
  }
};

export default getLocation;
