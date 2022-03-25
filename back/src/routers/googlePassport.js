import express from "express";
import { userAuthService } from "../services/userService";

const googleAuthRouter = express();

// passport 설치하기
// $ npm install passport-google-oauth20

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// Authenticate Requests
googleAuthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

googleAuthRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req);
});

export { googleAuthRouter }