const express = require( "express" );
const googleRouter = require( "./google" );
const facebookRouter = require( "./facebook" );
const githubRouter = require( "./github" );
const authRouter = express.Router();

authRouter.use( "/google", ( req, res, next ) => {
  next();
}, googleRouter );

authRouter.use( "/facebook", ( req, res, next ) => {
  next();
}, facebookRouter );

authRouter.use( "/github", ( req, res, next ) => {
  next();
}, githubRouter );

module.exports = authRouter;
