const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new MicrosoftStrategy(
    {
      callbackURL: `http://localhost:8080/api/v1/auth/microsoft/redirect`,
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      scope: ["openid", "profile", "email", "User.Read"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        User.findOne({ microsoftId: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              microsoftId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              //   profilePic: profile.photos[0].value,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      } catch (error) {
        done(error);
      }
    }
  )
);
