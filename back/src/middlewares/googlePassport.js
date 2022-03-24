// passport 설치하기
// $ npm install passport-google-oauth20
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

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
app.get('/auth/google', // 구글 로그인 페이지로 이동
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', // 구글 로그인 api로부터 받음
  passport.authenticate('google', { failureRedirect: '/login' }), // 실패했을 경우 /login으로 redirect
  function(req, res) {
    console.log(req);
    res.send(req);
  });