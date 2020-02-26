const passport = require( "passport" );
const GithubStrategy = require( "passport-github2" ).Strategy;
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
        { email: profile.emails[ 0 ].value },
        { username: profile.displayName }
      ]
    };

    // Check to see if user exists in DB
    User.findOne( findQuery )
      .then( currentUser => {
        if ( currentUser ) {
          currentUser.githubId = profile.id;
          currentUser.avatar = profile.photos[ 0 ].value;

          User.update( currentUser._id, currentUser )
            .then( updatedUser => {
              done( null, updatedUser );
            } )
            .catch( err => console.error( err ) );

        } else {
          const userData = {
            username: profile.displayName,
            githubId: profile.id,
            email: profile.emails[ 0 ].value,
            avatar: profile.photos[ 0 ].value
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
