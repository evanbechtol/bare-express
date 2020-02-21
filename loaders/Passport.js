const passport = require( "passport" );
const GoogleStrategy = require( "passport-google-oauth20" ).Strategy;
const { googleConsumerKey, googleConsumerSecret } = require( "../config" );
const UserModel = require( "../models/users" );
const MongooseService = require( "../services/MongooseService" );
const User = new MongooseService( UserModel );

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
    const findQuery = { googleId: profile.id };

    User.findOne( findQuery )
      .then( currentUser => {
        if ( currentUser ) {

        } else {
          const userData = { username: profile.displayName, googleId: profile.id };
          const user = new UserModel( userData );

          User.create( user )
            .then( newUser => {
              console.log( `New user created: ${newUser}` );
            } )
            .catch( err => {
              console.error( err );
            } );
        }
      } )
      .catch( err => console.error( err ) );


  } ) );

