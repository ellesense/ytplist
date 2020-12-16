const jwt = require("jsonwebtoken");
const JwtSecret = require("config").get("JwtSecret");

module.exports = function (req, res, next) {
  // obtain token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token." });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, JwtSecret);

    // save the user to req.user, so we can send this info. for every private request
    req.user = decoded.user;

    // req.user ~> {id: 'blahblah}
    console.log("From authenticate.js. req.user: ", req.user);

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Token is not valid." });
  }
};
