const passport = require( "passport" );
const GithubStrategy = require( "passport-github" ).Strategy;
const { githubClientId, githubClientSecret } = require( "../../../config" );
const UserModel = require( "../../../models/users" );
const MongooseService = require( "../../../services/MongooseService" );
const User = new MongooseService( UserModel );
const githubOptions = {
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: "/auth/github/redirect"
};

passport.use( new GithubStrategy( githubOptions,
  ( token, tokenSecret, profile, done ) => {
    const findQuery = {
      $or: [
        { githubId: profile.id },
        { username: profile.displayName }
      ]
    };

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
