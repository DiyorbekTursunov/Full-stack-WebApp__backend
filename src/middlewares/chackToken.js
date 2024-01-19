import jwt from "jsonwebtoken";

const ChackToken = (req, res, next) => {
  try {
    const auth_Header = req.header["authorization"];
    const access_token =
      auth_Header?.split(" ").length == 2
        ? auth_Header.split(" ")[1]
        : auth_Header;
    const chackToken = jwt.verify(access_token);
    req.token = chackToken;
    if (!chackToken) {
      return res.status(404).json({
        status: 404,
        message: "Token Required !!!",
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
export default ChackToken;
