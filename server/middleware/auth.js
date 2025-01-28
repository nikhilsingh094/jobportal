import jwt from "jsonwebtoken";

const authorisation = async (req, res, next) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const decode = await jwt.verify(cookie, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authorisation;
