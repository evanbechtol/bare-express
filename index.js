const bodyParser  = require( 'body-parser' );
const config      = require( './config' );
const express     = require( 'express' );
const morgan      = require( 'morgan' );
const routes      = require( './routes' );
const path        = require( 'path' );
const compression = require( 'compression' );
const logger      = require( './util/logger' );

const app = express();

// Setup views and path to static files
app.set( 'view engine', config.viewEngine );
app.set( 'views', path.join( __dirname, 'public' ) );

// Serve static content
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Set up middleware
app.use( morgan( 'dev' ) );
app.use( compression() );
app.use( bodyParser.urlencoded( {
  extended : false,
  limit    : '20mb'
} ) );
app.use( bodyParser.json( { limit : '20mb' } ) );

// Pass app to routes
routes( app );

// Setup default error handling
app.use(errorHandler);

// Start application
app.listen( config.port, () => {
  console.log( `Express running, now listening on port ${config.port}` );
  logger.info( `Express running, now listening on port ${config.port}` );
} );

/**
 * @description Configure default error handler for express, logs all failed requests
 *   to error.log
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function errorHandler(error, req, res, next) {
  logger.error(error);

  if ( res.headersSent ) {
    return  next(error);
  }

  res.status(400).json({
    error
  });
}
