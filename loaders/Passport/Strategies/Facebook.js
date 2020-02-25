const passport = require( "passport" );
const FacebookStrategy = require( "passport-facebook" ).Strategy;
const { facebookAppId, facebookAppSecret } = require( "../../../config" );
const UserModel = require( "../../../models/users" );
const MongooseService = require( "../../../services/MongooseService" );
const User = new MongooseService( UserModel );
const facebookOptions = {
  clientID: facebookAppId,
  clientSecret: facebookAppSecret,
  callbackURL: "/auth/facebook/redirect"
};


passport.use( new FacebookStrategy( facebookOptions,
  ( token, refreshToken, profile, done ) => {
    const findQuery = {
      $or: [
        { facebookId: profile.id },
        { username: profile.displayName }
      ]
    };

    // Check to see if user exists in DB
    User.findOne( findQuery, { __v: 1 }, { lean: false } )
      .then( currentUser => {
        if ( currentUser ) {
          if ( !currentUser.facebookId ) {
            currentUser.facebookId = profile.id;
            currentUser.save().then( updatedUser => {
              done( null, updatedUser );
            } );
          } else {
            done( null, currentUser );
          }
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
  }
) );
