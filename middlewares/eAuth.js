const config = require( "../config" );
const logger = require( "../services/Logger" );
const resUtil = require( "./response" );
const request = require( "request" );

module.exports = { validateApp };

/**
 * @description Validates that the application token provided is valid with
 * E-Auth
 * @param req {object} Express object
 * @param res {object} Express object
 * @param next {function} Express next MW
 */
function validateApp ( req, res, next ) {
  const endpoint = "e_auth/validate/apps";
  const url = `${config.eAuthUrl}/${endpoint}?token=${req.token}`;
  const options = { auth: { bearer: req.token } };
  request.get( url, options, function ( err, response, body ) {
    if ( err ) {
      return res.status( 500 ).send( resUtil.sendError( err ) );
    }

    let data;

    if ( typeof body === "object" ) {
      data = body;
    } else {
      try {
        data = JSON.parse( body );
      } catch ( e ) {
        logger.error( JSON.stringify( e ) );
      }
    }

    if ( data && data.success === false ) {
      return res.status( 400 ).send( resUtil.sendError( data && data.data ? data.data.message : JSON.stringify( data ) ) );
    } else {
      next();
    }
  } );
}
