import jwt from "jsonwebtoken";
import User from "../models/User/User.js";

const fetchCode = async (req, res, next) => {
  try {
    const token = req.header("code-token"); 

    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Authorization token required!" }] });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    req.user = user;
    req.code = decoded.code;

    next();
  } catch (error) {
    console.error("Error in fetchUser middleware:", error.message);
    return res.status(400).json({ errors: [{ msg: "Invalid token or token has expired" }] });
  }
};

export default fetchCode;