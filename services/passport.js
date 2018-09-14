const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

/* 
  We require our user model instance this way because when we use
  mongoose in a testing environment such as mocha or jest, our model
  files will be required into the project multiples times. Mongoose will
  get confused and think we are attempting to load in multiple models
  with the name of "users" even though we already loaded one in
*/
const User = mongoose.model("users");

/* 
  We encode the user that was either created or retrieved from our
  mongo database before we attach it to a cookie
  The user.id here is the ID that was generated by mongo, not the profile ID
  we got through Google. We use this because we may use many different oauth strategies,
  not just Google, so we have to use something else to identify the user with.
*/
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/*
  The ID we use as an argument is the same ID we got from 'serializing' our user.
  We do the opposite, we turn an ID into a mongoose model instance. We search through
  our database of users and after we find a specific user, we call done with that user.
*/
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google strategy using passport is created with the client ID and
// client secret that were defined in our keys.js file
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // This is the route the user will be sent to after said user grants
      // Google permission
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    /* 
      This code is executed as soon as the user is sent back to our server and
      and after we exchanged the code Google gave us for some identifying information.
      The access token proves to Google that we are allowed access to the user's info
      and we can send them things such as emails.
      The profile has all of the user's identifying information such as their name and email.
    */
    async (accessToken, refreshToken, profile, done) => {
      // We find out if the user signing in is a new or existing user
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We already have a record with the given profile ID
        return done(null, existingUser);
      }
      /* 
            We don't have a record with this profile ID, so make one using our mongoose
            model class. The ID is pulled from the user's Google profile and and then it's
            saved in our mongo database.
          */
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
