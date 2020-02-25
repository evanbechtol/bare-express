const index = require( "passport" );
const UserModel = require( "../../models/users" );
const MongooseService = require( "../../services/MongooseService" );
const User = new MongooseService( UserModel );


// Include authentication strategies
require( "./Strategies/Google" );
require( "./Strategies/Facebook" );
require( "./Strategies/Github" );


index.serializeUser( ( user, done ) => {
  done( null, user._id );
} );

index.deserializeUser( ( id, done ) => {
  User.findById( id )
    .then( user => {
      done( null, user );
    } )
    .catch( err => console.error( err ) );
} );
