const Messages = require( "../config/messages" );
const resUtil = require( "./response" );

module.exports = { validateToken };

/**
 * @description Validates that the application token was provided in the request
 * @param req {object} Express object
 * @param res {object} Express object
 * @param next {function} Express MW
 * @returns {*}
 */
function validateToken ( req, res, next ) {
  const token = ( req.headers && req.headers.authorization !== undefined )
    ? req.headers.authorization.slice( 7 )
    : req.query.appToken || req.params.appToken || req.body.appToken;

  if ( token ) {
    req.token = token;
    next();
  } else {
    return res.status( 400 ).send( resUtil.sendError( Messages.responses.appTokenNotProvided ) );
  }
}
