const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require("dotenv").config();
const User = require('./models/user');
 
const GOOGLE_CALLBACK_URL = 'http://localhost:5000/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
},
async function(request, accessToken, refreshToken, profile, done) {
  //return done(null, profile);
  const defaultUser = {
    fullName: `${profile.name.givenName} ${profile.name.familyName}`,
    email: profile.emails[0].value,
    picture: profile.photos[0].value,
    googleId: profile.id,
  };

  const user = await User.findOrCreate({
    where: { googleId: profile.id },
    defaults: defaultUser,
  }).catch((err) => {
    console.log('Error signing up', err);
    return done(err, null);
  }).then(console.log("user find"));

  if (user && user[0]) return done(null, user && user[0]);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
  /*
    done(null, {
      id: user.id,
      email: user.email,
      picture: user.picture
    });*/

});

passport.deserializeUser(function(user, done) {
  done(null, user);
  console.log('DeSerialized user', user);
});
