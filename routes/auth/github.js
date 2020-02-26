const express = require( "express" );
const router = express.Router();
const passport = require( "passport" );

router.get( "/", passport.authenticate( "github", {
  scope: [ "read:user", "user:email" ]
} ) );

router.get( "/redirect", passport.authenticate( "github", {
  successRedirect: "http://localhost:8080/profile",
  failureRedirect: "http://localhost:8080/login"
} ) );

module.exports = router;
