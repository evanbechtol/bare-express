const passport = require( "passport" );
const GoogleStrategy = require( "passport-google-oauth20" ).Strategy;
const { googleConsumerKey, googleConsumerSecret } = require( "../../../config" );
const UserModel = require( "../../../models/users" );
const MongooseService = require( "../../../services/MongooseService" );
const User = new MongooseService( UserModel );
const googleOptions = {
  clientID: googleConsumerKey,
  clientSecret: googleConsumerSecret,
  callbackURL: "/auth/google/redirect"
};

passport.use( new GoogleStrategy( googleOptions,
  ( token, tokenSecret, profile, done ) => {
    const findQuery = { googleId: profile.id };

    // Check to see if user exists in DB
    User.findOne( findQuery )
      .then( currentUser => {
        if ( currentUser ) {
          done( null, currentUser );
        } else {
          const userData = {
            username: profile.displayName,
            googleId: profile.id
          };
          const user = new UserModel( userData );

          User.create( user )
            .then( newUser => {
              console.log( `New user created: ${newUser}` );
              done( null, newUser );
            } )
            .catch( err => console.error( err ) );
        }
      } )
      .catch( err => console.error( err ) );
  } ) );
