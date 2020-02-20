const passport = require( "passport" );
const GoogleStrategy = require( "passport-google-oauth20" ).Strategy;
const { googleConsumerKey, googleConsumerSecret } = require( "../config" );

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
const options = {
  clientID: googleConsumerKey,
  clientSecret: googleConsumerSecret,
  callbackURL: "/auth/google/redirect"
};

passport.use( new GoogleStrategy( options,
  ( token, tokenSecret, profile, done ) => {
    // passport callback function
  } ) );
