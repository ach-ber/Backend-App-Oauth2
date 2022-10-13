const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require("dotenv").config();
const userModel = require('../models/user');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
async function(request, accessToken, refreshToken, profile, done) {
    //return done(null, profile);
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
    };

    try {
        let user = await userModel.findOne({ googleId: profile.id })

        if (user) {
            done(null, user)
        } else {
            user = await userModel.create(defaultUser)
            done(null, user)
        }

    } catch (err) {
        console.error(err)
    }


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