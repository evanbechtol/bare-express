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
    const findQuery = {
      $or: [
        { googleId: profile.id },
        { username: profile.displayName }
      ]
    };

    // Check to see if user exists in DB
    User.findOne( findQuery )
      .then( currentUser => {
        if ( currentUser ) {
          currentUser.avatar = profile.photos[ 0 ].value;

          User.update( currentUser._id, currentUser )
            .then( updatedUser => {
              done( null, updatedUser );
            } )
            .catch( err => console.error( err ) );

        } else {
          const userData = {
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[ 0 ].value,
            avatar: profile.photos[ 0 ].value
          };
          const user = new UserModel( userData );

          User.create( user )
            .then( newUser => {
              done( null, newUser );
            } )
            .catch( err => console.error( err ) );
        }
      } )
      .catch( err => console.error( err ) );
  } ) );
