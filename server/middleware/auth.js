import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId == decodedData?.id;
    next();
  } catch (error) {
    res.status(400).json("Invalid Credentials");
  }
};

export default auth;
