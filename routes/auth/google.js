const express = require( "express" );
const router = express.Router();
const passport = require( "passport" );

router.get( "/", passport.authenticate( "google", {
  scope: [ "profile", "email" ]
} ) );

router.get( "/redirect", passport.authenticate( "google" ), ( req, res ) => {
  res.redirect( "http://localhost:8080/profile" );
} );

module.exports = router;
