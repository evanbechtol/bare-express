const express = require( "express" );
const router = express.Router();
const passport = require( "passport" );

router.get( "/", passport.authenticate( "google", {
  scope: [ "profile" ]
} ) );


router.get( "/redirect", ( req, res ) => {
  res.send( { message: "You are authenticated!" } );
} );

module.exports = router;
