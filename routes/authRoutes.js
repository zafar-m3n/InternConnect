const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get(
  "/microsoft",
  passport.authenticate("microsoft", { session: false })
);

router.get(
  "/microsoft/redirect",
  passport.authenticate("microsoft", {
    session: false,
    failureRedirect: `http://localhost:3000/auth/login`,
  }),
  (req, res) => {
    const token = jwt.sign({ user: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  res.send("Logout");
});

module.exports = router;
