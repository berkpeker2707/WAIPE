const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "761245236828-l51iinjn7go697gatp3thr1i8rpf8v5m.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:1000/api/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          return done(null, newUser);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
