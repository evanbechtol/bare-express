const express = require( "express" );
const googleRouter = require( "./google" );
const facebookRouter = require( "./facebook" );
const authRouter = express.Router();

authRouter.use( "/google", ( req, res, next ) => {
  next();
}, googleRouter );

authRouter.use( "/facebook", ( req, res, next ) => {
  console.log( "In cb func for /facebook" );
  next();
}, facebookRouter );

module.exports = authRouter;
