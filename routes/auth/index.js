const express = require( "express" );
const googleRouter = require( "./google" );
const authRouter = express.Router();

authRouter.use( "/google", ( req, res, next ) => {
  console.log( "In cb func for /google" );
  next();
}, googleRouter );

module.exports = authRouter;
