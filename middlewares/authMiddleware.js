const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Invalid token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
