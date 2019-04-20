const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//not to get problem when running the test
const mongoose = require('mongoose');

const keys = require("../config/keys");
const User = mongoose.model('users');  // creating a user model

passport.serializeUser((user, done)=>{
    done(null, user.id);   // done is call back , user is mongoose model instance

});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=> {
        done(null,user);
    });
});


passport.use(
  new GoogleStrategy(
    { 
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy:true
    },
    (accessToken, refreshToken, profile, done) => {

        User.findOne({googleId: profile.id}).then((existingUser) =>{   // existing user is instance
                if (existingUser){
                    //we already have a record with the given profile ID
                    done(null, existingUser);
                } else{
                    //we don't have a user record with this ID, so make a new record
                
                    new User({googleId : profile.id})
                    .save()
                    
                    .then(user => done(null,user));
                }

            });
        }
     )
);

//promise 


