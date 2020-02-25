const express = require( "express" );
const router = express.Router();
const passport = require( "passport" );

router.get( "/", passport.authenticate( "facebook", {
  scope: [ "email" ]
} ) );

router.get( "/redirect", passport.authenticate( "facebook", {
  successRedirect: "http://localhost:8080/profile",
  failureRedirect: "http://localhost:8080/login"
} ) );

module.exports = router;
